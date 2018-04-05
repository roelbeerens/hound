<template>
    <nav class="navbar fixed-bottom navbar-light bg-light controls">
        <div class="controls__np">
            <div class="container text-truncate">
                <a class="muted">🔈 Now Playing:</a>
                <span></span>
            </div>
        </div>
        <div class="container">
            <div class="d-flex">
                <div class="mr-auto d-flex controls__buttons">
                    <a href="#" class="controls__buttons-stop">Stop</a>
                    <a href="#" class="controls__buttons-mute">Mute</a>
                </div>
                <div class="controls__volume">
                    <input type="range" min="1" max="100" value="20" name="volume" class="controls__buttons-volume" id="volume">
                </div>
            </div>
        </div>
    </nav>
</template>

<style lang="scss">
    .controls {
        .playing & {
            .controls__np,
            .controls__buttons-stop {
                display: block !important;
            }
        }
        .controls__np {
            position: absolute;
            bottom: 100%;
            width: 100%;
            left: 0;
            font-size: 13px;
            background: #f2f2f2;
            padding: 0 1rem;
            display: none;
            text-transform: capitalize;
        }
        .container {
            padding: 8px 0;
        }
        .d-flex {
            width: 100%;
            .controls__buttons {
                width: auto;
                .controls__buttons-stop {
                    padding-right: 15px;
                    display: none;
                }
                .controls__buttons-mute {
                    padding-right: 15px;
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
                background: #d3d3d3;
                outline: none;
                -webkit-transition: opacity .15s ease-in-out;
                transition: opacity .15s ease-in-out;
                &::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    width: 20px;
                    height: 20px;
                    background: var(--primary);
                    cursor: pointer;
                    border-radius: 50%;
                    border: none;
                    outline: none;
                }
            }
        }
    }
</style>
