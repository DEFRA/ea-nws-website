#!/bin/bash

image_names=(
    "ea_nws_website_frontend" 
    "ea_nws_website_backend" 
    "ea_nws_website_api" 
    "ea_nws_website_nginx"
    )
build_version=""
save_image=false

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

    OPTIONS
        -v [build version] Tags the docker image with the specified version
        -s Saves the docker image locally as a file
        -d [Domain name] (optional) sets the domain name. Must start with http:// 
        -a [API url] (optional) sets the url for the api. Must start with http://
        -h Prints out this help message."

}

while getopts "v:sd:a:h" opt; do
    case $opt in
    v) # build version
        build_version=${OPTARG}
        ;;
    s) # Save docker image
        save_image=true
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

echo "Building docker image as version: "${build_version}
export BUILD_VERSION=${build_version}

docker compose build
echo "Build Complete!"

if [[ $save_image = true ]]; then
    for image_name in ${image_names[@]}; do
        image_file=${image_name}-${build_version}.tar
        echo "Saving docker image as: "${image_file}
        docker save -o ${image_file} ${image_name}:${build_version}
        echo "Image file saved"
    done
fi
