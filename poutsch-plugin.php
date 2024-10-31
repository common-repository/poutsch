<?php
/*
Plugin Name: Poutsch
Plugin URI: wordpress.org/extend/plugins/poutsch/
Description: Display questions and opinions with style.
Version: 0.3.1
Author: Poutsch Corp.
Author URI: poutsch.com
License: GPL2
*/


// v0.1 : First Release
// v0.3 : HTML4 compatible

  // Create shortcode handler for Voice
  // [poutsch id=xxx ]
function addpoutsch($atts, $content = null) {
  extract(shortcode_atts(array( "id" => ''), $atts));
  return "<div class='poutsch_question' style='margin-bottom:15px'><a href='https://poutsch.com/question/".$id."' target='_blank'>https://poutsch.com/question/".$id."</a></div>";
}
add_shortcode('poutsch', 'addpoutsch');

  // Add Voice button to MCE

function add_poutsch_button() {
  if( ! current_user_can('edit_posts') && ! current_user_can('edit_pages') )
    return;

  if( get_user_option('rich_editing') == 'true') {
    wp_enqueue_script('jquery');
    wp_enqueue_script('jquery-ui');
    wp_enqueue_script('json2');
    wp_enqueue_script('jquery-ui-autocomplete');
    add_filter('mce_external_plugins', 'add_poutsch_tinymce_plugin');
    add_filter('mce_buttons', 'register_poutsch_button');
  }
}

function register_poutsch_button($buttons) {
  array_push($buttons, "|", "poutschEmbed");
  return $buttons;
}

function add_poutsch_tinymce_plugin($plugin_array) {
  $dir = '/wp-content/plugins/poutsch';
  $url = get_bloginfo('wpurl');
  $plugin_array['poutschEmbed'] = $url.$dir.'/custom/editor_plugin.js';
  return $plugin_array;
}
add_action('init', 'add_poutsch_button');

  // Add settings menu to Wordpress

  if ( is_admin() ){ // admin actions
    //add_action( 'admin_menu', 'poutsch_create_menu' );
  } else {
    // non-admin enqueues, actions, and filters
   $poutsch_active = plugins_url('/wp-poutsch-plugin/wp-poutsch-include.js', __FILE__);
   wp_enqueue_script('poutsch-include', $poutsch_active,  false, false);
 }
