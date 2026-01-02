<?php
// This file is generated. Do not modify it manually.
return array(
	'shape-dynamic-block' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/shape-dynamic-block',
		'version' => '1.0.0',
		'title' => 'Shape Dynamic Block',
		'category' => 'widgets',
		'icon' => 'admin-post',
		'description' => 'Display and Filter latest posts',
		'keywords' => array(
			'latest',
			'posts'
		),
		'example' => array(
			
		),
		'supports' => array(
			'html' => false
		),
		'attributes' => array(
			'numberOfPosts' => array(
				'type' => 'number',
				'default' => 5
			),
			'displayFeaturedImage' => array(
				'type' => 'boolean',
				'default' => true
			),
			'order' => array(
				'type' => 'string',
				'default' => 'desc'
			),
			'orderBy' => array(
				'type' => 'string',
				'default' => 'date'
			)
		),
		'textdomain' => 'shape-dynamic-block',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	)
);
