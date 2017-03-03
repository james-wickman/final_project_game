var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

var score = 0;
var scoreText;
var jumpTimer = 0;



function preload() {

	game.load.atlasJSONHash('bot', 'master/examples/assets/sprites/running_bot.png', 'master/examples/assets/sprites/running_bot.json');
    game.load.image('sky', 'master/examples/assets/skies/sky1.png');
    game.load.image('ground', 'master/examples/assets/sprites/platform.png');

}

function create() {
	game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(0, 0, 'sky');

    platforms = game.add.group();

    var ground = platforms.create(0, game.world.height - 64, 'ground');
    ground.scale.setTo(2, 2);

    var ledge = platforms.create(400, 400, 'ground');

    ledge = platforms.create(-150, 250, 'ground');
    
    s = game.add.sprite(game.world.centerX, game.world.centerY, 'bot');
    s.anchor.setTo(0.5, 0.5);
    s.scale.setTo(2, 2);

    s.animations.add('run');

    // player = game.add.sprite(64, game.world.height - 150, 'bot');
    game.physics.enable(s, Phaser.Physics.ARCADE);
    s.body.collideWorldBounds = true;

    s.body.bounce.set(0.1);

    s.body.gravity.set(0, 380);
}

function update() {
	flip = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
	flip.onDown.add(shootBullet, this);
	function shootBullet() { 
		s.scale.x *= -1;

	}
	// game.input.keyboard.onDown.add(processKey, this);
	// function processKey(key) {
	// if (key.keyCode == Phaser.RIGHT) {    
	// 	s.scale.x *= -1;
	// }} 


	if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
    {
    	if (s.scale.x == 2) {

    	}else {
    		s.scale.x *= -1;
    	}
    	s.animations.play('run', 10, true);
        s.x -= 4;
    } 
    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
    {
    	if (s.scale.x == 2) {
    		s.scale.x *= -1;
    	}else {
    		
    	}
    	s.animations.play('run', 10, true);
        s.x += 4;
    }
    else {
    	s.animations.stop('run', 10, false);
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.UP) && s.body.onFloor() && game.time.now > jumpTimer)
    {
        s.body.velocity.y = -450;
        jumpTimer = game.time.now + 750;

    }



}

function render() {

    game.debug.spriteInfo(s, 20, 32);

}
