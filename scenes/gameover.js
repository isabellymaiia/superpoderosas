class GameOver extends Phaser.Scene {
    constructor() {
        super({
            key: 'GameOver',
        });
    }

    // Exibe texto de fim de jogo
    create() {
        this.add.text(400, 300, 'Game Over', {
            fontSize: '48px',
            fill: '#fff'
        }).setOrigin(0.5);
    }
}