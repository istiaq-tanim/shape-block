<?php

function create_block_register_meta()
{
  register_meta('post', '_create_block_post_subtitle', array(
    'single' => true,
    'type' => 'string',
    'show_in_rest' => true,
    'sanitize_callback' => 'sanitize_text_field',
    'auth_callback' => function () {
      return current_user_can('edit_posts');
    }
  ));
}
add_action('init', 'create_block_register_meta');

function create_block_add_meta_box()
{
  add_meta_box(
    'create_block_post_options_metabox',
    'Post Options',
    'create_block_post_options_metabox_html',
    'post',
    'normal',
    'default',
    array('__back_compat_meta_box' => true, '__block_editor_compatible_meta_box' => true)
  );
}

add_action('add_meta_boxes', 'create_block_add_meta_box');

function create_block_post_options_metabox_html($post)
{
  $subtitle = get_post_meta($post->ID, '_create_block_post_subtitle', true);
  wp_nonce_field('create_block_update_post_metabox', 'create_block_update_post_nonce');
?>
  <p>
    <label for="create_block_post_subtitle_field"><?php esc_html_e('Post Subtitle', 'create_block'); ?></label>
    <br />
    <input class="widefat" type="text" name="create_block_post_subtitle_field" id="create_block_post_subtitle_field"
      value="<?php echo esc_attr($subtitle); ?>" />
  </p>
<?php
}

function create_block_save_post_metabox($post_id, $post)
{

  $edit_cap = get_post_type_object($post->post_type)->cap->edit_post;
  if (!current_user_can($edit_cap, $post_id)) {
    return;
  }
  if (!isset($_POST['create_block_update_post_nonce']) || !wp_verify_nonce($_POST['create_block_update_post_nonce'], 'create_block_update_post_metabox')) {
    return;
  }

  if (array_key_exists('create_block_post_subtitle_field', $_POST)) {
    update_post_meta(
      $post_id,
      '_create_block_post_subtitle',
      sanitize_text_field($_POST['create_block_post_subtitle_field'])
    );
  }
}

add_action('save_post', 'create_block_save_post_metabox', 10, 2);
