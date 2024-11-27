#!/bin/bash

image_tags=(
    "frontend" 
    "backend" 
    )
image_name="ea_nws_website"
build_version=""
save_image=false
upload=false

print_help()
{
    echo "  NAME: create_release.sh

    SYNOPSIS
        ./create_release.sh [options]
        Builds and saves website docker image.

    DESCRIPTION
        Docker and Docker compose are required to be installed to run this script. The
        user running this script must be added to the docker group. To do this run the
        command  \"sudo usermod -aG docker \$USER\".
        Any arguments no entered will be prompted when running the script.

        Outline of steps:
        1. Builds the container by calling docker compose build
        2. Saves the container image locally
        3. Uploads images to ECR

        NOTE: To upload to ECR you must first export your AWS access keys in the same
              terminal tab that you run this script from.

    OPTIONS
        -v [build version] Tags the docker image with the specified version
        -s Saves the docker image locally as a file
        -u Uploads to ECR

        -h Prints out this help message."

}

while getopts "v:suh" opt; do
    case $opt in
    v) # build version
        build_version=${OPTARG}
        ;;
    s) # Save docker image
        save_image=true
        ;;
    u) # Upload docker image to ECR
        upload=true
        ;;
    h) # print help
        print_help
        exit 1
        ;;
    *) # Invalid option
        echo "Invalid option"
        exit 1
        ;;
    esac
done

if [[ -z "${build_version}" ]]; then
    while true; do
        read -p "Please Specify a Build Version: " build_version
        while true; do
            read -p "Can you confirm "$build_version" is correct (y/n)? " yn
            case $yn in
                Y|y ) break 2 ;;
                N|n ) break 1 ;;
                * ) echo "Please answer y or n.";;
            esac
        done
    done
fi

if [[ $save_image = false ]]; then
    while true; do
        read -p "Do you want to save the image (y/n)? " yn
        case $yn in
            Y|y ) 
                save_image=true 
                break 1 
                ;;
            N|n ) break 1 ;;
            * ) echo "Please answer y or n.";;
        esac
    done
fi

if [[ $upload = false ]]; then
    while true; do
        read -p "Do you want to upload the image to ECR (y/n)? " yn
        case $yn in
            Y|y ) 
                upload=true 
                break 1 
                ;;
            N|n ) break 1 ;;
            * ) echo "Please answer y or n.";;
        esac
    done
fi

if [[ $upload = true ]]; then
    echo "To upload to ECR you must export your AWS credentials before running this script."
    echo "On the AWS start screen click \"Access Keys\" to find them and export using the"
    echo "below commands:"
    echo "    export AWS_ACCESS_KEY_ID=\"****************\""
    echo "    export AWS_SECRET_ACCESS_KEY=\"*************************\""
    echo "    export AWS_SESSION_TOKEN=\"*************************************************\""
    echo ""
    while true; do
        read -p "Can you confirm this has been done (y/n)? " yn
        case $yn in
            Y|y ) 
                break 1 
                ;;
            N|n ) 
                echo "Exiting. keys must be exported before running this script"
                exit 1 ;;
            * ) echo "Please answer y or n.";;
        esac
    done
fi

echo "Building docker image as version: "${build_version}
export BUILD_VERSION=${build_version}

docker compose build --no-cache
echo "Build Complete!"

if [[ $save_image = true ]]; then
    for image_tag in ${image_tags[@]}; do
        image_file=${image_name}-${image_tag}-${build_version}.tar
        echo "Saving docker image as: "${image_file}
        docker save -o ${image_file} ${image_name}:${image_tag}-${build_version}
        echo "Image file saved"
    done
fi

if [[ $upload = true ]]; then
    ecr_location=891376991609.dkr.ecr.eu-west-2.amazonaws.com
    ecr_repo_name=ea_nws_docker_registry
    ecr_repo=${ecr_location}/${ecr_repo_name}

    echo "logging in to ECR repo"
    aws ecr get-login-password --region eu-west-2 | docker login --username AWS --password-stdin ${ecr_location}

    for image_tag in ${image_tags[@]}; do
        echo "Tagging image $image_name:$image_tag-$build_version"
        docker tag ${image_name}:${image_tag}-${build_version} ${ecr_repo}:${image_tag}-${build_version}
        echo "Pushing image $ecr_repo:$image_tag-$build_version to ECR"
        docker push ${ecr_repo}:${image_tag}-${build_version}
    done
fi
