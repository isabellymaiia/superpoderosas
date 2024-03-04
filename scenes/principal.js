class Principal extends Phaser.Scene {
    constructor() {
        super({
            key: 'Principal',
        });
    }

    // Pré-carregamento 
    preload() {
        // Carrega as imagens necessárias
        this.load.image('bg', 'assets/cidade.jpg');
        this.load.image('player', 'assets/docinho.png');
        this.load.image('turbo', 'assets/turbo.png');
        this.load.image('vilao', 'assets/macacolouco.png');
        this.load.image('predio', 'assets/predio-comercial.png');
        this.load.image('estrelas', 'assets/estrela.png'); 
    }

    create() {
        // Adiciona o plano de fundo
        this.add.image(500, 300, 'bg').setScale(1.65);

        // Adiciona o efeito especial
        this.turbo = this.add.image(0, 0, 'turbo').setScale(0.19);

        // Adiciona o sprite do jogador
        this.player = this.physics.add.sprite(100, 550, 'player').setScale(0.2);
        this.player.body.setSize(300, 400, true);
        this.player.setCollideWorldBounds(true);

        // Cria o controle das setas do teclado
        this.teclado = this.input.keyboard.createCursorKeys();

        // Inicializa o turbo como invisível e define a direção do jogador como direita
        this.turbo.setVisible(false);
        this.player.setCollideWorldBounds(true);
        this.player.direita = true;

        // Cria um grupo de objetos estáticos (prédios)
        this.predio = this.physics.add.staticGroup();

        // Adiciona os prédios ao grupo
        this.predio.create(200, 200, 'predio').setScale(0.2).refreshBody();
        this.predio.create(300, 450, 'predio').setScale(0.2).refreshBody();
        this.predio.create(800, 400, 'predio').setScale(0.2).refreshBody();
        this.predio.create(600, 200, 'predio').setScale(0.2).refreshBody();

        // Adiciona colisão entre o jogador e os prédios
        this.physics.add.collider(this.player, this.predio);

        // Adiciona um grupo de estrelas
        this.estrelas = this.physics.add.group();

        // Adiciona estrelas
        this.adicionarEstrela();

        // Configura a colisão com a borda do mundo para cada estrela
        this.estrelas.children.iterate(function (estrela) {
            estrela.setCollideWorldBounds(true);
        });

        // Adiciona colisão entre o jogador e as estrelas
        this.physics.add.overlap(this.player, this.estrelas, this.coletarEstrela, null, this);

        // Adiciona colisão entre os prédios e as estrelas
        this.physics.add.collider(this.estrelas, this.predio);

        // Adiciona o vilão
        this.vilao = this.physics.add.sprite(900, 100, 'vilao').setScale(0.4);
        this.vilao.setCollideWorldBounds(true);

        // Adiciona colisão entre o jogador e o vilão
        this.physics.add.overlap(this.player, this.vilao, this.gameOver, null, this);

        // Adiciona colisão entre o vilão e os prédios
        this.physics.add.collider(this.predio, this.vilao);

        // Inicializa a pontuação
        this.pontuacao = 0;
        this.textoPontuacao = this.add.text(16, 16, 'Pontuação: 0', {
            fontSize: '32px',
            fill: '#fff'
        });
    }

    update() {
        // Movimento do jogador
        if (this.teclado.left.isDown) {
            this.player.setVelocityX(-150);
            if (this.player.direita) {
                this.player.setFlip(true, false);
                this.player.direita = false;
            }
        } else if (this.teclado.right.isDown) {
            this.player.setVelocityX(150);
            if (!this.player.direita) {
                this.player.setFlip(false, false);
                this.player.direita = true;
            }
        } else {
            this.player.setVelocityX(0);
        }

        // Movimento para cima 
        if (this.teclado.up.isDown) {
            this.player.setVelocityY(-150);
            this.ativarTurbo(); // Chama a função que ativa o efeito turbo
        } else {
            this.semTurbo(); // Chama a função que desativa a visibilidade do turbo
        }

        // Alinha o turbo de acordo com a posição do jogador
        this.turbo.setPosition(this.player.x, this.player.y + this.player.height / 9);

        // Comportamento de perseguição do vilão
        const speed = 80;
        if (this.player.x < this.vilao.x) {
            this.vilao.setVelocityX(-speed);
        } else if (this.player.x > this.vilao.x) {
            this.vilao.setVelocityX(speed);
        }
        if (this.player.y < this.vilao.y) {
            this.vilao.setVelocityY(-speed);
        } else if (this.player.y > this.vilao.y) {
            this.vilao.setVelocityY(speed);
        }
    }

    // Função para ativar o efeito turbo
    ativarTurbo() {
        this.turbo.setVisible(true);
    }

    // Função para desativar o efeito turbo
    semTurbo() {
        this.turbo.setVisible(false);
    }

    // Função para adicionar estrelas
    adicionarEstrela() {
        // Adiciona uma estrela em um local aleatório da tela
        const x = Phaser.Math.Between(100, 900);
        const y = Phaser.Math.Between(100, 500);
        const estrela = this.estrelas.create(x, y, 'estrelas').setScale(0.1);
        estrela.setCollideWorldBounds(true); // Define a colisão com a borda do mundo para esta estrela
    }

    // Função para coletar estrelas
    coletarEstrela(player, star) {
        // Remove a estrela atual
        star.destroy();
        // Adiciona uma nova estrela em um local aleatório
        this.adicionarEstrela();
        // Atualiza a pontuação
        this.pontuacao += 10;
        this.textoPontuacao.setText('Pontuação: ' + this.pontuacao);
    }

    // Função para o game over
    gameOver() {
        // Transição para a tela de game over
        this.scene.start('GameOver');
    }
}
