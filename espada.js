function Espada(context, dummy, heroi) {
    this.context = context;
    this.dummy = dummy;
    this.heroi = heroi;
    this.x = this.heroi.x + this.heroi.largura * this.heroi.direcao;
    this.y = this.heroi.y + this.heroi.altura / 2;
    this.altura = 0;
    this.largura = 0;
    this.direcao = this.heroi.direcao;
    this.forca = 1;
    this.forma = 0;
    this.framestotais = 0;
    this.frames = 0;
    this.framedoataque = 0;
    this.framesvidahitbox = 0;
    this.podeatacar = 1;
    this.atingiu = 0;
}
Espada.prototype = {
    atualizar: function(){
        // Contador de frames que determina quanto tempo a espada fica na tela
        if (this.framestotais >= this.framedoataque + this.frames){
            this.mudarForma(0);
        } 
        if (this.forma == 4 && heroi.noar != 1){
            this.mudarForma(0);
        }

        // Determina a direção do herói quando ele se move
        if (this.heroi.direcao != 0){
            this.direcao = this.heroi.direcao;
        }



        // Gerenciador de forma, que muda a localização da espada

        // Para o lado e no ar
        if (this.forma == 1 || this.forma == 4){
            if (this.direcao > 0) {
                this.x = (this.heroi.x + this.heroi.largura) - 3;
            }
            else {
                this.x = this.heroi.x - this.largura + 3;
            }
            this.y = this.heroi.y + (this.heroi.altura - this.altura) / 2;
        }
        // Para cima
        else if (this.forma == 2){
            if ( this.direcao > 0){
                this.x = (this.heroi.x + this.heroi.largura / 2);
            }
            else {
                this.x = (this.heroi.x - this.heroi.largura / 2) - this.largura / 2;
            }
            this.y = (this.heroi.y + this.heroi.altura) - this.altura ;
        }
        // Para baixo
        else if (this.forma == 3){
            if (this.direcao == 1){
                this.x = heroi.x;
            }
            else {
                this.x = this.heroi.x + this.heroi.largura - this.largura;
            }
            this.y = this.heroi.y + this.heroi.altura - this.altura;
        }
        // Quando não tem forma (espada com 0px), colocar no x e y do herói
        else {
            this.x = this.heroi.x;
            this.y = this.heroi.y;
        }



        // Hitbox
        if (this.x + this.largura > this.dummy.x && this.x < this.dummy.x + this.dummy.largura && this.dummy.y + this.dummy.altura > this.y && this.dummy.y < this.y + this.altura){
            dummy.colidiu();
        }



        // Sobe o total de frames para o cooldown do ataque e diminui o tempo de vida da hitbox
        this.framestotais++;
        this.framesvidahitbox--;
    },
    desenhar: function() {
        // Tire os comentários para ver a hitbox
        //this.context.fillStyle = "red";
        //this.context.fillRect(this.x, this.y, this.largura, this.altura);
   },
   mudarForma: function(formaNum) {
        // No chão parado ou para o lado
        if (formaNum == 1 && this.podeatacar == 1 && this.framesvidahitbox <= 0){
            this.altura = 40;
            this.largura = 60;
            this.forma = 1;
            this.frames = 14;
            this.framesvidahitbox = this.frames;
            this.framedoataque = this.framestotais;
            this.podeatacar = 0;
        }
        // Para cima
        else if (formaNum == 2 && this.podeatacar == 1 && this.framesvidahitbox <= 0){
            this.altura = 60;
            this.largura = 50;
            this.forma = 2
            this.frames = 15;
            this.framesvidahitbox = this.frames;
            this.framedoataque = this.framestotais;
            this.podeatacar = 0;
        }
        // Para baixo
        else if (formaNum == 3 && this.podeatacar == 1 && this.framesvidahitbox <= 0){
            this.altura = 20;
            this.largura = 80;
            this.forma = 3;
            this.frames = 10;
            this.framesvidahitbox = this.frames;
            this.framedoataque = this.framestotais;
            this.podeatacar = 0;
        }
        // No ar
        else if (formaNum == 4 && this.podeatacar == 1 && this.heroi.noar == 1 && this.framesvidahitbox <= 0){
            // Esse ataque é especial, ele tira a velocidade y do personagem
            this.heroi.vely = -5;
            this.altura = 100;
            this.largura = 100;
            this.forma = 4;
            this.frames = 14;
            this.framesvidahitbox = this.frames;
            this.framedoataque = this.framestotais;
            this.podeatacar = 0;
        }
        // Caso não esteja fazendo nada, tira a hitbox
        else if (this.framesvidahitbox <= 0) {
            this.altura = 0;
            this.largura = 0;
            this.forma = 0;
            this.frames = 0;
            this.podeatacar = 1;
            this.atingiu = 0;
        }
   }
}