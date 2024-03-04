class Welcome extends Phaser.Scene {
    // Construtor da cena
    constructor() {
        super({
            key: 'Welcome',
        });
    }


    // pré-carregamento de recursos
    preload() {
        this.load.image('fundo', 'assets/bg1.jpg');
        this.load.image('botao', 'assets/play.png');
    }

    create() {
        // configuração para reconhecer as teclas do teclado
        this.cursors = this.input.keyboard.createCursorKeys();
        this.returnKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        this.add.image(500, 300, 'fundo').setScale(1.9);
        this.playBt = this.add.image(500, 500, 'botao').setScale(0.8);
        this.playBt.setInteractive(); // Adiciona interatividade ao botão
        // Configuração de evento para iniciar o jogo ao clicar no botão "play"
        this.playBt.on('pointerdown', () => {
            this.scene.start('ComoJogar');
        });
    }
    
}
