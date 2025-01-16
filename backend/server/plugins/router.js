const routes = [].concat(
  require('../routes/public'),
  require('../routes/sign_in/signin_start'),
  require('../routes/sign_in/signin_validate'),
  require('../routes/sign_up/signup_start'),
  require('../routes/sign_up/org_start'),
  require('../routes/sign_up/org_validate'),
  require('../routes/sign_up/signup_validate'),
  require('../routes/sign_up/signup_feedback'),
  require('../routes/update_profile/update_profile'),
  require('../routes/add_contact/mobile/mobile_start'),
  require('../routes/add_contact/mobile/mobile_validate'),
  require('../routes/add_contact/landline/landline_start'),
  require('../routes/add_contact/landline/landline_validate'),
  require('../routes/add_contact/email/email_start'),
  require('../routes/add_contact/email/email_validate'),
  require('../routes/register_location_to_partner/register_location_to_partner'),
  require('../routes/register_location_to_partner/update_location_registration'),
  require('../routes/register_location_to_partner/unregister_location_from_partner'),
  require('../routes/ordnance_survey/post_code_search'),
  require('../routes/ordnance_survey/name_search'),
  require('../routes/ordnance_survey/oauth_2'),
  require('../routes/qgis/qgis'),
  require('../routes/account/account_delete'),
  require('../routes/bulk_uploads/download_template'),
  require('../routes/bulk_uploads/upload_file'),
  require('../routes/bulk_uploads/process_file'),
  require('../routes/sign_out/sign_out'),
  require('../routes/bulk_uploads/process_status'),
  require('../routes/bulk_uploads/save_locations'),
  require('../routes/bulk_uploads/get_invalid_locations'),
  require('../routes/shapefile/validate_shapefile'),
  require('../routes/shapefile/unzip_shapefile'),
  require('../routes/shapefile/convert_shapefile'),
  require('../routes/add_location/duplicate_location'),
  require('../routes/add_location/download_flood_history'),
  require('../routes/elasticache/get_data'),
  require('../routes/elasticache/list_locations'),
  require('../routes/elasticache/list_contacts'),
  require('../routes/location/create'),
  require('../routes/location/remove'),
  require('../routes/location/update'),
  require('../routes/organization/update'),
  require('../routes/organization/create_contacts'),
  require('../routes/organization/update_contact'),
  require('../routes/organization/remove_contacts'),
  require('../routes/gov_uk_notify/sign_up_complete'),
  require('../routes/gov_uk_notify/account_confirm_deletion')
)

module.exports = {
  plugin: {
    name: 'router',
    register: (server, options) => {
      server.route(routes)
    }
  }
}
