class Camara {

    constructor( videoNode ) {

        this.videoNode = videoNode;
        console.log('Camara class init');

    }

    encender() {

        navigator.mediaDevices.getUserMedia({
            audio: false,
            video: { width: 300, height: 300 }
        }).then( stream => {

            this.videoNode.srcObject = stream;
            this.stream = stream;

        });

    }

    apagar() {

        this.videoNode.pause();

        if ( this.stream ) {
            this.stream.getTracks()[0].stop();
        }        

    }

    tomarFoto() {

        // Crear un elemento canvas para renderizar la foto
        let canvas = document.createElement('canvas');

        // Colocar las dimensiones igual al video
        canvas.setAttribute('width', 300);
        canvas.setAttribute('height', 300);

        // Obtener el contexto del canvas
        let context = canvas.getContext('2d'); // una simple imagen

        // Dibujar la imagen dentro del canvas
        context.drawImage( this.videoNode, 0, 0, canvas.width, canvas.height );

        // 
        this.foto = context.canvas.toDataURL();

        // Limpieza
        canvas = null;
        context = null;

        return this.foto;

    }

}