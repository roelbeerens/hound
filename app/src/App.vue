<template>
    <div id="app">
        <controls></controls>
        <main>
            <router-view/>
        </main>
    </div>
</template>

<script>
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'
  import Footer from './components/Footer'

  export default {
    name: 'App',
    components: {
      'controls': Footer
    }
  }
</script>

<style lang="scss">
    html {
        body,
        .bg-dark {
            background: #262528 !important;
            color: #58565d;
        }

        #app {
            &:before {
                content: '';
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 0;
                opacity: 1;
            }
        }

        main {
            padding-bottom: 56px;

            h1 {
                font-size: 2.2rem;
                font-weight: 700;
                margin-bottom: 1rem;
                color: #cccccc;
            }

            figure {
                margin: 0;
            }
            .hmt {
                margin-top: 2rem;
            }
            .hmb {
                margin-bottom: 2rem;
            }
            .btn-sm {
                border-radius: 1rem;
                padding: .25rem 1rem;

                .fa-icon {
                    margin-bottom: 2px;
                }
            }
            .btn-back {
                text-transform: uppercase;
                font-weight: 700;
                color: #4b4a50;
                margin-top: .25rem;
            }

            .container {
                @media (min-width: 576px) {
                    padding-left: 0;
                    padding-right: 0;
                }
            }
        }

        .fa-icon {
            vertical-align: middle;
        }

        .btn {
            box-shadow: none !important;
        }

        .btn-dark {
            background: #2D2D30;
            border: none;

            &:hover {
                background: #58565d !important;
                color: #262528 !important;
            }
        }

        .btn-primary {
            background: linear-gradient(to right, #DB815F, #D05D5C);
            border: none;

            &:active, &:hover {
                background: linear-gradient(to right, #D05D5C, #DB815F) !important;
            }
        }

        a {
            color: #DB815F;

            &:hover {
                color: #D05D5C;
            }
        }

        .form-control {
            background: #2D2D30;
            border-color: #2D2D30;
            outline: 0 !important;
            box-shadow: none !important;
            color: #58565d;

            &::placeholder {
                color: #58565d;
                opacity: 1;
            }

            &:focus {
                background: #2D2D30;
                border-color: #2D2D30;
                color: #58565d;
            }
        }
    }
</style>
