const dummy_imagem = new Image();
dummy_imagem.src = "sprites/dummy/dummy.png";

function Dummy(context, espada, porrete, heroi, barradecombo){
    this.context = context;
    this.espada = espada;
    this.porrete = porrete;
    this.heroi = heroi;
    this.barradecombo = barradecombo;
    this.x = 600;
    this.y = 400;
    this.velx = 0;
    this.vely = 0;
    this.largura = 20;
    this.altura = 50;
    this.direcao = 0;
    this.gravidade = 1;
    // Armazena todos os ataques, é zerado e contado de novo quando ativa o contariguais()
    this.ataques = [0, 0, 0, 0];
    // Serve para quando o array chegar no 4 voltar para o 0
    this.ataquesposicaoarray = 0;
    // Serve para saber quais ataques em quais posições são iguais
    this.ataquepos = [0, 0, 0, 0, 0, 0, 0, 0];
    this.pontos = 0;
}
Dummy.prototype = {
    atualizar: function() {
        // Física
        this.vely += this.gravidade;

        // Essa parte faz o dummy quicar se tiver uma certa velocidade e atingir o chão
        if (this.vely > 20 && this.y >= this.context.canvas.height - this.altura){
            this.vely *= -1;
            this.vely = this.vely / 2;
        }

        // Se não tiver, ele para
        else if (this.y + this.altura >= this.context.canvas.height && this.vely > 0){
            this.y = this.context.canvas.height - this.altura;
            this.vely = 0;
        }

        // Se não estiver no chão, ele cai
        else {
            this.y += this.vely;
        }

        // Faz o dummy quicar se atingir o teto
        if (this.y < 0){
            this.y = 0;
            this.vely *= -1;
        }

        // Faz o dummy quicar caso atinge uma parede
        if (this.velx > 5 && this.x + this.largura > context.canvas.width ||
            this.velx < -5 && this.x < 0){
                if (this.x < 0){
                    this.x = 0;
                }
                else {
                    this.x = context.canvas.width;
                }
                this.velx *= -1;
            }

        // Não permite ele sair da tela caso não tenha velocidade o suficiente
        else if (this.x + this.largura > context.canvas.width || this.x < 0){
            if (this.x < 0){
                this.x = 0;
            }
            else {
                this.x = context.canvas.width - this.largura;
            }
        }

        // Faz o dummy se mover com a velocidade do eixo x
        this.x += this.velx;

        // Resistência do ar, não permitindo que o dummy fique movendo de um laod para o outro
        this.velx /= 1.2;
    },
    colidiu: function() {
        if (heroi.arma == 1 && espada.atingiu == 0){
            if (espada.forma == 1){
                this.velx += 4 * espada.direcao;
                this.contadorataques(1);
                this.contariguais();
                this.pontos = 150 / (this.ataquepos[0] + 1);
                
                    barradecombo.somarpontos(this.pontos, 50);
                
                
            }
            else if (espada.forma == 2){
                this.vely += 20 * -1;
                this.contadorataques(2);
                this.contariguais();
                this.pontos = 150 / (this.ataquepos[1] + 1);
                
                    barradecombo.somarpontos(this.pontos, 50);
                    
                
            }
            else if (espada.forma == 3){
                this.vely += 12 * -1;
                this.velx += 20 * espada.direcao;
                this.contadorataques(3);
                this.contariguais();
                this.pontos = 150 / (this.ataquepos[2] + 1);
                
                    barradecombo.somarpontos(this.pontos, 50);
                
                
            }
            else if (espada.forma == 4){
                this.velx += 10 * espada.direcao;
                this.contadorataques(4);
                this.contariguais();
                this.pontos = 150 / (this.ataquepos[3] + 1);
                
                    barradecombo.somarpontos(this.pontos, 50);
                
                
            }
            espada.atingiu = 1;
        }
        else if (heroi.arma == 2 && porrete.atingiu == 0){
            if (porrete.forma == 1){
                this.velx += 8 * porrete.direcao;
                this.contadorataques(5);
                this.contariguais();
                this.pontos = 150 / (this.ataquepos[4] + 1);
                
                    barradecombo.somarpontos(this.pontos, 50);
                
                
            }
            else if (porrete.forma == 2){
                this.vely += 30 * -1;
                this.contadorataques(6);
                this.contariguais();
                this.pontos = 150 / (this.ataquepos[5] + 1);
                
                    barradecombo.somarpontos(this.pontos, 50);
                
                
            }
            else if (porrete.forma == 3){
                this.vely += 25 * -1
                this.velx += 10 * porrete.direcao;
                this.contadorataques(7);
                this.contariguais();
                this.pontos = 150 / (this.ataquepos[6] + 1);
                
                    barradecombo.somarpontos(this.pontos, 50);
                
                
            }
            else if (porrete.forma == 4){
                this.vely = 0;
                this.vely += 30 * -1;
                this.velx += 5 * porrete.direcao;
                this.contadorataques(8);
                this.contariguais();
                this.pontos = 150 / (this.ataquepos[7] + 1);
                
                    barradecombo.somarpontos(this.pontos, 50);
                
                
            }
            porrete.atingiu = 1;
        }
    },
    desenhar: function() {
        // Renderização da hitbox. Tire os comentários para vê-la
        //this.context.fillStyle = "black";
        //this.context.fillRect(this.x, this.y, this.largura, this.altura);

        this.context.drawImage(dummy_imagem, this.x - 25, this.y);
    },
    contadorataques: function(numataque){
        this.ataques[this.ataquesposicaoarray] = numataque;
        this.ataquesposicaoarray++;
        if (this.ataquesposicaoarray > 4){
            this.ataquesposicaoarray = 0;
        }
    },
    contariguais: function(){
        this.ataquepos.fill(0);
        for (let i = 0 ; i < 8 ; i++){
            for (let j = 0 ; j < 4 ; j++){
                if(i == this.ataques[j]){
                    this.ataquepos[i]++;
                }
            }
        }
    }
}