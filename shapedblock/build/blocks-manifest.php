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
		'supports' => array(
			'html' => false,
			'color' => array(
				'background' => true,
				'text' => true,
				'gradients' => true,
				'link' => true
			),
			'spacing' => array(
				'padding' => true
			)
		),
		'styles' => array(
			array(
				'name' => 'squared',
				'label' => 'Squared',
				'isDefault' => true
			),
			array(
				'name' => 'rounded',
				'label' => 'Rounded'
			)
		),
		'example' => array(
			'attributes' => array(
				'text' => 'This is some Text!',
				'shadow' => true
			)
		),
		'textdomain' => 'shaped-text',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'attributes' => array(
			'text' => array(
				'type' => 'string',
				'source' => 'html',
				'selector' => 'p'
			),
			'alignment' => array(
				'type' => 'string',
				'default' => 'left'
			),
			'shadow' => array(
				'type' => 'boolean',
				'default' => false
			),
			'shadowOpacity' => array(
				'type' => 'number',
				'default' => 30
			),
			'textColor' => array(
				'type' => 'string',
				'default' => '#000'
			),
			'style' => array(
				'type' => 'object',
				'default' => array(
					'color' => array(
						'background' => '#fff'
					),
					'spacing' => array(
						'padding' => array(
							'top' => '50px',
							'right' => '50px',
							'bottom' => '50px',
							'left' => '50px'
						)
					)
				)
			)
		),
		'viewScript' => 'file:./view.js'
	)
);
