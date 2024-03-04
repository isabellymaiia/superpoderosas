class ComoJogar extends Phaser.Scene {
    constructor() {
        super({
            key: 'ComoJogar'
        });
    }

    create() {
        // Adicione um texto explicativo
        this.add.text(100, 200, 'Pressione as setas (esquerda, direita e cima) do teclado para se mover.\n\nColete estrelas para ganhar pontos!\n\nNão deixe o macaco louco te pegar!\n\n\nPressione qualquer tecla para prosseguir', {
            fontSize: '20px',
            fill: '#fff'
        });

        // Adicione um botão ou uma tecla para avançar para a próxima cena
        this.input.keyboard.once('keydown', function (event) {
            this.scene.start('Principal'); // Avança para a cena principal quando uma tecla é pressionada
        }, this);
    }
}