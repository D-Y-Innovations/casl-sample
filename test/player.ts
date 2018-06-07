export class Player {

    play() {
        console.log('play')
    }

    stop() {
        console.log('stop')
    }
}

export class MusicPlayer extends Player {
    
    play() {
        console.log('music play')
    }

    stop() {
        console.log('music stop')
    }
}

export class MoviePlayer extends Player {
    
    play() {
        console.log('movie play')
    }

    stop() {
        console.log('movie stop')
    }
}