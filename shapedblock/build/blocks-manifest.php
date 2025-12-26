<?php
// This file is generated. Do not modify it manually.
return array(
	'shapedblock' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/shapedblock',
		'version' => '0.1.0',
		'title' => 'Shaped Text',
		'category' => 'widgets',
		'icon' => 'text',
		'description' => 'A Block of Text',
		'keywords' => array(
			'text',
			'paragraph',
			'box'
		),
		'example' => array(
			
		),
		'supports' => array(
			'html' => false
		),
		'textdomain' => 'shaped-text',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'attributes' => array(
			'text' => array(
				'type' => 'string',
				'source' => 'html',
				'selector' => 'h4'
			),
			'alignment' => array(
				'type' => 'string',
				'default' => 'left'
			),
			'backGround' => array(
				'type' => 'string',
				'default' => '#fff'
			),
			'textColor' => array(
				'type' => 'string',
				'default' => '#000'
			)
		),
		'viewScript' => 'file:./view.js'
	)
);
