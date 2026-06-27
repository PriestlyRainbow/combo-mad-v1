const fonte = new FontFace("Fonte", "9101943.eps");
fonte.load().then(() => {document.fonts.add(fonte)});

function BarraDeCombo(context, dummy) {
    this.context = context;
    this.dummy = dummy;
    this.tempodocombo = 0;
    this.cordocombo = "blue";
    this.cordaborda = "black";
    this.combo = 0;
    this.combospassados = [0, 0, 0, 0];
    this.gradespassadas = [-1, -1, -1, -1];
}

BarraDeCombo.prototype = {
    atualizar: function() {
        // Coloca o limite do tempo do combo
        if (this.tempodocombo > 300){
            this.tempodocombo = 300;
        }
        else if (this.tempodocombo < 0){
            this.combopassado();
            this.tempodocombo = 0;
            this.cordocombo = "blue";
            this.cordaborda = "black";
            this.combo = 0;
            this.grade = 0;
        }

        // Determina a grade do combo
        if (this.combo > 10000){
            this.cordocombo = "white";
            this.cordaborda = "yellow";
            this.grade = 5;
        }
        else if (this.combo > 8000){
            this.cordocombo = "yellow"
            this.grade = 4;
        }
        else if (this.combo > 6000){
            this.cordocombo = "red";
            this.grade = 3;
        }
        else if (this.combo > 4000){
            this.cordocombo = "cyan";
            this.grade = 2;
        }
        else if (this.combo > 2000){
            this.cordocombo = "green";
            this.grade = 1;
        }
        else {
            this.cordocombo = "blue";
            this.grade = 0;
        }
        this.tempodocombo--;
    },
    desenhar: function() {
        
        this.renderizarpassadoplacar();
        // Desenha o tempo do combo e o combo
        context.font = "bold 50px Courier New";
        context.fillStyle = this.cordocombo;
        context.fillText(`Combo: ${Math.trunc(this.combo)}`, 50, 50);
        context.strokeStyle = this.cordaborda;
        context.lineWidth = 1;
        context.strokeText(`Combo: ${Math.trunc(this.combo)}`, 50, 50);
        
        // Renderizar a barra de tempo
        if (this.combo > 10000){
            this.context.fillStyle = this.cordaborda;
            this.context.fillRect(45, 70, this.tempodocombo + 10, 20)
        }
        context.fillStyle = this.cordocombo;
        context.fillRect(50, 75, this.tempodocombo, 10);
        
        this.context.font = "80px Fonte";
        context.fillStyle = this.cordocombo;
        context.strokeStyle = this.cordaborda;
        context.lineWidth = 2;
        // Renderiza a grade
        if (this.grade == 5){
            context.fillText("SS", 475, 70);
            context.strokeText("SS", 475, 70);
        }
        else if (this.grade == 4){
            context.fillText("S", 475, 70);
            context.strokeText("S", 475, 70);
        }
        else if (this.grade == 3){
            context.fillText("A", 475, 70);
            context.strokeText("A", 475, 70);
        }
        else if (this.grade == 2){
            context.fillText("B", 475, 70);
            context.strokeText("B", 475, 70);
        }
        else if (this.grade == 1){
            context.fillText("C", 475, 70);
            context.strokeText("C", 475, 70);
        }
        else {
            context.fillText("D", 475, 70);
            context.strokeText("D", 475, 70);
        }

    },
    somarpontos: function(pontos, tempoextra){
        // Lembrar que precisa colocar pontos e depois o tempo que cada ataque garante
        this.combo += pontos;
        this.tempodocombo += tempoextra;
    },
    combopassado: function(){
        this.combospassados[3] = this.combo;
        this.gradespassadas[3] = this.grade;
        
        if(this.combospassados[0] < this.combospassados[3]){
            this.combospassados[2] = this.combospassados[1];
            this.combospassados[1] = this.combospassados[0];
            this.combospassados[0] = this.combospassados[3];
        }
        else if (this.combospassados[1] < this.combospassados[3]){
            this.combospassados[2] = this.combospassados[1];
            this.combospassados[1] = this.combospassados[3];
        }
        else if (this.combospassados[2] < this.combospassados[3]){
            this.combospassados[2] = this.combospassados[3];
        }

        if (this.gradespassadas[0] < this.gradespassadas[3]){
            this.gradespassadas[2] = this.gradespassadas[1];
            this.gradespassadas[1] = this.gradespassadas[0];
            this.gradespassadas[0] = this.gradespassadas[3];
        }
        else if (this.gradespassadas[1] < this.gradespassadas[3]){
            this.gradespassadas[2] = this.gradespassadas[1];
            this.gradespassadas[1] = this.gradespassadas[3];
        }
        else if (this.gradespassadas[2] < this.gradespassadas[3]){
            this.gradespassadas[2] = this.gradespassadas[3];
        }
    },
    renderizarpassadoplacar: function(){
        this.renderizarcombopassado();
    },
    renderizarcombopassado: function(){
        context.font = "bold 25px Courier New";
        context.fillStyle = "black";
        
        if (this.combospassados[0] > 0){
        context.fillText("Placar:", 675, 20);
        context.fillText(`${Math.trunc(this.combospassados[0])}`, 700, 50);
        }
        if (this.combospassados[1] > 0){
        context.fillText(`${Math.trunc(this.combospassados[1])}`, 700, 80);
        }
        if (this.combospassados[2] > 0){
        context.fillText(`${Math.trunc(this.combospassados[2])}`, 700, 110);
        }
    }
}