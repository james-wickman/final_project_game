var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

var score = 0;
var scoreText;
var jumpTimer = 0;
var s;
var ledge;
var sprite;
var weapon;
var cursors;
var fireButton;
var bullets;
var platforms;
var bulletTimer = 0;
var direction_facing = 'left';

function preload() {

	game.load.image('bullet', 'master/examples/assets/sprites/bullet.png');
	game.load.atlasJSONHash('bot', 'master/examples/assets/sprites/running_bot.png', 'master/examples/assets/sprites/running_bot.json');
    game.load.image('sky', 'master/examples/assets/skies/sky1.png');
    game.load.image('ground', 'master/examples/assets/sprites/platform.png');

}

function create() {
    game.world.setBounds(-30, -30, 4000, 2000);
	game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.sprite(0, 300, 'sky');

    cursors = this.input.keyboard.createCursorKeys();

    fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

    platforms = game.add.group();
    platforms.enableBody = true;

    var ground = platforms.create(0, game.world.height - 54, 'ground');
    ground.scale.setTo(2, 2);
    ground.body.immovable = true;


    ledge = platforms.create(0, 800, 'ground');
    ledge.body.immovable = true;

    ledge = platforms.create(300, 700, 'ground');
    ledge.body.immovable = true;

    ledge = platforms.create(350, 800, 'ground');
    ledge.body.immovable = true;

    ledge = platforms.create(550, 800, 'ground');
    ledge.body.immovable = true;

    ledge = platforms.create(1000, 800, 'ground');
    ledge.body.immovable = true;

    ledge = platforms.create(2550, 800, 'ground');
    ledge.body.immovable = true;

    ledge = platforms.create(1350, 800, 'ground');
    ledge.body.immovable = true;

    ledge = platforms.create(2050, 800, 'ground');
    ledge.body.immovable = true;

    ledge = platforms.create(3050, 800, 'ground');
    ledge.body.immovable = true;

    s = game.add.sprite(200, 700, 'bot');
    s.anchor.setTo(0.5, 0.5);
    s.scale.setTo(2, 2);

    s.animations.add('run');

    // player = game.add.sprite(64, game.world.height - 150, 'bot');
    game.physics.enable(s, Phaser.Physics.ARCADE);
    s.body.collideWorldBounds = true;

    s.body.bounce.set(0.03);

    s.body.gravity.set(0, 380);
    game.camera.follow(s);
    game.camera.deadzone = new Phaser.Rectangle(150, 200, 400, 200);
    game.physics.arcade.enable([s, ledge]);
    ledge.body.allowGravity = false;
	ledge.body.immovable = true;

	bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(30, 'bullet');
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 1);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true)

	fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

}

function update() {
	var hitPlatform = game.physics.arcade.collide(s, platforms);
	s.body.velocity.x = 0;

	if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
    {
    	if (s.scale.x == 2) {

    	}else {
    		s.scale.x *= -1;
    		direction_facing = 'left';
    	}
    	s.animations.play('run', 10, true);
        s.body.velocity.x = -350;

    } 
    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
    {
    	if (s.scale.x == 2) {
    		s.scale.x *= -1;
    		direction_facing = 'right'
    	}else {
    		
    	}
    	s.animations.play('run', 10, true);
        s.body.velocity.x = 350;

    }
    else {
    	s.animations.stop('run', 10, false);
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.UP) && s.body.touching.down && hitPlatform && game.time.now > jumpTimer)
    {
        s.body.velocity.y = -350;
        jumpTimer = game.time.now + 350;

    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {

    }
    game.physics.arcade.collide(s, ledge);

    if (fireButton.isDown)
    {
        fireBullet();
    }
}

function fireBullet() {
    //  Grab the first bullet we can from the pool
    if (game.time.now > bulletTimer) {
    	var BULLET_SPEED = 700;
        var BULLET_SPACING = 450;
        //  Grab the first bullet we can from the pool
        var bullet = bullets.getFirstExists(false);

        if (bullet)
        {
            //  And fire it
            //  Make bullet come out of tip of ship with right angle
            var bulletOffset = 20 * Math.sin(game.math.degToRad(s.angle));
            bullet.reset(s.x + bulletOffset, s.y);
            bullet.angle = s.angle;
            if(direction_facing == 'right') {
            	game.physics.arcade.velocityFromAngle(bullet.angle, BULLET_SPEED, bullet.body.velocity);
            }
            if(direction_facing == 'left') {
            	game.physics.arcade.velocityFromAngle(bullet.angle, -BULLET_SPEED, bullet.body.velocity);
            }
            if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {

            	bullet.body.velocity.y = -200;
            	console.log(bullet.body.velocity.y)
            }
            if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
            	bullet.body.velocity.y = 2l00;
            }

            bulletTimer = game.time.now + BULLET_SPACING;
        }
     }
 }
	    

function render() {
	var zone = game.camera.deadzone;
    game.debug.spriteInfo(s, 20, 32);
    // weapon.debug();

}
