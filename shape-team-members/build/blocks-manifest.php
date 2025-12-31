<?php
// This file is generated. Do not modify it manually.
return array(
	'shape-team-members' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/shape-team-members',
		'version' => '0.1.0',
		'title' => 'Shape Team Members',
		'category' => 'media',
		'icon' => 'groups',
		'description' => 'A Team Members Grid',
		'keywords' => array(
			'Team',
			'Members',
			'Grid'
		),
		'example' => array(
			
		),
		'supports' => array(
			'html' => false,
			'align' => array(
				'wide',
				'full'
			)
		),
		'attributes' => array(
			'columns' => array(
				'type' => 'number',
				'default' => 2
			)
		),
		'textdomain' => 'shape-team-members',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js'
	)
);
