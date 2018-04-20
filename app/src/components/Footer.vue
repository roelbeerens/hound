<template>
    <nav class="navbar fixed-bottom navbar-light controls" v-bind:class="{ playing : now_playing }">
        <div class="controls__np">
            <div class="container text-truncate">
                <a class="text-muted">
                    <icon name="play"></icon>
                    Now Playing:</a>
                <span>{{ now_playing }}</span>
            </div>
        </div>
        <div class="container">
            <div class="d-flex">
                <div class="mr-auto d-flex controls__buttons">
                    <a href="javascript:void(0)" v-on:click="stop" class="controls__buttons-stop">
                        <icon name="stop"></icon>
                    </a>
                    <a href="javascript:void(0)" v-on:click="mute" class="controls__buttons-mute">
                        <span v-if="!mute_status">
                            <icon name="volume-up"></icon>
                        </span>
                        <span v-if="mute_status">
                            <icon name="volume-off"></icon>
                        </span>
                    </a>
                </div>
                <div class="controls__volume">
                    <input type="range" min="1" max="100" :value="current_volume" name="volume" class="controls__buttons-volume" id="volume" v-on:change="volume">
                </div>
                <b-navbar-toggle target="nav_collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar top-bar"></span>
                    <span class="icon-bar middle-bar"></span>
                    <span class="icon-bar bottom-bar"></span>
                </b-navbar-toggle>
            </div>
        </div>
        <b-collapse is-nav id="nav_collapse">
            <div class="container">
                <b-navbar-nav>
                    <b-nav-item href="/#/">Home</b-nav-item>
                    <b-nav-item href="/#/radio">Radio</b-nav-item>
                    <b-nav-item href="/#/settings">Settings</b-nav-item>
                </b-navbar-nav>
            </div>
        </b-collapse>
    </nav>
</template>

<script>
  import axios from 'axios'

  export default {
    data () {
      return {
        now_playing: null,
        current_volume: 40,
        mute_status: false
      }
    },
    mounted: function () {
      this.getStatus()
      let self = this
      setInterval(function () {
        self.getStatus()
      }, 5000)
    },
    methods: {
      getStatus: function () {
        axios.get(process.env.API + '/player/status')
          .then(response => {
            this.current_volume = response.data.volume
            if (response.data['media-title']) {
              if (response.data['media-title'].includes('wav')) {
                this.now_playing = null
              } else if (response.data['media-title'].includes('mp3')) {
                this.now_playing = 'Fetching Information...'
              } else {
                this.now_playing = response.data['media-title'].toLowerCase()
              }
            } else {
              this.now_playing = null
            }
          })
          .catch(e => {
            console.log(e)
          })
      },
      stop: function () {
        axios.post(process.env.API + '/player/stop')
          .then(response => {
            if (response.data[0].status === 'stopped') {
              this.now_playing = null
            }
          })
          .catch(e => {
            console.log(e)
          })
      },
      mute: function () {
        axios.post(process.env.API + '/player/mute')
          .then(response => {
            if (response.data[0].status === 'mute') {
              if (this.mute_status) {
                this.mute_status = false
              } else {
                this.mute_status = true
              }
            }
          })
          .catch(e => {
            console.log(e)
          })
      },
      volume: function (event) {
        axios.post(process.env.API + '/player/volume/set', {
          volume: event.target.value
        })
          .then(response => {
            console.log(response.data)
          })
          .catch(e => {
            console.log(e)
          })
      }
    }
  }
</script>

<style lang="scss">
    .controls {
        -webkit-transform: translate3d(0, 0, 0);
        border-top: 1px solid rgba(#434248, .25);
        padding-bottom: 0.6rem;
        -webkit-backdrop-filter: blur(10px);
        backdrop-filter: blur(10px);
        background-color: rgba(#262528, 0.93) !important;

        &.playing {
            .controls__np,
            .controls__buttons-stop {
                display: block !important;
            }

            ~ main {
                padding-bottom: 91px;
            }
        }
        .controls__np {
            position: absolute;
            bottom: 100%;
            width: 100%;
            left: 0;
            font-size: 13px;
            background: #2D2D30;
            padding: 0 1rem;
            display: none;
            text-transform: capitalize;

            .fa-icon {
                font-size: 10px;
                margin-right: 0.5rem;
                margin-bottom: 3px;
            }
        }
        .fa-icon {
            width: auto;
            height: 1em;
            max-width: 100%;
            max-height: 100%;
            font-size: 16px;
        }
        .container {
            padding: 8px 0;
        }
        .text-muted {
            color: #434248 !important;
        }
        .d-flex {
            width: 100%;
            .controls__buttons {
                width: auto;
                .controls__buttons-stop {
                    padding-right: 15px;
                    display: none;
                    min-width: 32px;
                }
                .controls__buttons-mute {
                    padding-right: 15px;
                    min-width: 32px;
                    text-align: center;
                }
            }
        }
        .controls__volume {
            width: 100%;
            .controls__buttons-volume {
                -webkit-appearance: none;
                width: 100%;
                height: 10px;
                border-radius: 5px;
                background: #2D2D30;
                outline: none;
                -webkit-transition: opacity .15s ease-in-out;
                transition: opacity .15s ease-in-out;
                &::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    width: 20px;
                    height: 20px;
                    margin: 5px;
                    background: #58565d;
                    cursor: pointer;
                    border-radius: 50%;
                    border: none;
                    outline: none;
                    margin-left: -1px;
                }
            }
        }
        a {
            color: #58565d;
        }
        .navbar-toggler {
            padding: 0;
            border: none;
            outline: 0;
            margin-left: 15px;
            .icon-bar {
                background-color: #D05D5C;
                width: 22px;
                transition: all 0.2s;
                height: 2px;
                display: block;
                border-radius: 1px;

                + .icon-bar {
                    margin-top: 4px;
                }
            }
            .top-bar {
                transform: rotate(45deg);
                transform-origin: 10% 10%;
            }
            .middle-bar {
                opacity: 0;
            }
            .bottom-bar {
                transform: rotate(-45deg);
                transform-origin: 10% 90%;
                max-width: 22px;
                margin-left: 0px;
            }

            &[aria-expanded="false"] {
                .top-bar {
                    transform: rotate(0);
                }
                .middle-bar {
                    opacity: 1;
                }
                .bottom-bar {
                    transform: rotate(0);
                    max-width: 18px;
                    margin-left: 4px;
                }
            }
        }
        .navbar-collapse {
            position: absolute;
            bottom: 100%;
            left: 0;
            width: 100%;
            border-top: 1px solid rgba(#434248, .25);
            border-bottom: 1px solid rgba(#434248, .25);
            -webkit-backdrop-filter: blur(10px);
            backdrop-filter: blur(10px);
            background-color: rgba(#262528, 0.93) !important;

            .container {
                padding: 5px 20px;

                @media (min-width: 576px) {
                    padding: 5px 5px;
                }
            }

            .navbar-nav {
                flex-direction: row;
                justify-content: flex-end;
            }

            .nav-item:last-child {
                .nav-link {
                    padding-right: 0;
                }
            }

            .nav-link {
                padding-left: .5rem;
                padding-right: .5rem;
                color: #434248 !important;

                &:hover {
                    color: #58565d !important;
                }
            }
        }
    }
</style>
