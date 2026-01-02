<?php

/**
 * Plugin Name:       Shape Dynamic Block
 * Description:       Display and Filter latest posts.
 * Version:           1.0.0
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       shape-dynamic-block
 *
 * @package CreateBlock
 */

if (! defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

// function dynamic_render_block()
// {
// 	return "Dynamic Page";
// };
// function create_block_shape_dynamic_block_block_init()
// {
// 	if (function_exists('wp_register_block_types_from_metadata_collection')) {
// 		wp_register_block_types_from_metadata_collection(__DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php');
// 		return;
// 	}
// 	if (function_exists('wp_register_block_metadata_collection')) {
// 		wp_register_block_metadata_collection(__DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php');
// 	}


// 	$manifest_data = require __DIR__ . '/build/blocks-manifest.php';
// 	foreach (array_keys($manifest_data) as $block_type) {
// 		register_block_type(__DIR__ . "/build/{$block_type}");
// 	}
// }
// add_action('init', 'create_block_shape_dynamic_block_block_init');

if (!defined('ABSPATH')) {
	exit;
}

function dynamic_render_block($attributes, $content, $block)
{
	$args = array(
		'posts_per_page' => $attributes['numberOfPosts'],
		'post_status' => 'publish',
		"order" => $attributes["order"],
		"orderby" => $attributes["orderBy"]
	);
	$recent_posts = get_posts($args);

	$posts = '<ul ' . get_block_wrapper_attributes() . '>';
	foreach ($recent_posts as $post) {
		$title = get_the_title($post);
		$title = $title ? $title : __('(No title)', 'latest-posts');
		$permalink = get_permalink($post);
		$excerpt = get_the_excerpt($post);

		$posts .= '<li>';

		if ($attributes["displayFeaturedImage"] && has_post_thumbnail($post)) {
			$posts .= get_the_post_thumbnail($post, 'thumbnail');
		}
		$posts .= '<h5><a href="' . esc_url($permalink) . '">' . $title . '</a></h5>';
		$posts .= '<time datetime="' . esc_attr(get_the_date('c', $post)) . '">' . esc_html(get_the_date('', $post)) . '</time>';

		if (!empty($excerpt)) {
			$posts .= '<p>' . $excerpt . '</p>';
		}

		$posts .= '</li>';
	}
	$posts .= '</ul>';

	return $posts;
}

function create_block_shape_dynamic_block_block_init()
{
	register_block_type(__DIR__ . '/build/shape-dynamic-block', array(
		'render_callback' => 'dynamic_render_block'
	));
}
add_action('init', 'create_block_shape_dynamic_block_block_init');
