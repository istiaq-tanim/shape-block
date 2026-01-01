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
		'example' => array(
			'attributes' => array(
				'columns' => 2
			),
			'innerBlocks' => array(
				array(
					'name' => 'create-block/shape-team-members',
					'attributes' => array(
						'name' => 'JOHN Doe',
						'bio' => 'Lorem Ipsum has been the industry\'s standard dummy text ever since specimen book.',
						'url' => 'https://picsum.photos/id/1012/200/300',
						'socialLinks' => array(
							array(
								'icon' => 'facebook'
							),
							array(
								'icon' => 'instagram'
							)
						)
					)
				),
				array(
					'name' => 'create-block/shape-team-members',
					'attributes' => array(
						'name' => 'JOHN Doe',
						'bio' => 'Lorem Ipsum has been the industry\'s standard dummy text ever since specimen book.',
						'url' => 'https://picsum.photos/id/1011/200/300',
						'socialLinks' => array(
							array(
								'icon' => 'facebook'
							),
							array(
								'icon' => 'instagram'
							)
						)
					)
				)
			)
		),
		'textdomain' => 'shape-team-members',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js'
	)
);
