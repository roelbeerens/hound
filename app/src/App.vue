<template>
    <div id="app" class="loading">
        <navigation></navigation>
        <main>
            <router-view/>
        </main>
        <controls></controls>
    </div>
</template>

<script>
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'
  import Header from './components/Header'
  import Footer from './components/Footer'

  export default {
    name: 'App',
    components: {
      'navigation': Header,
      'controls': Footer
    },
    mounted: function () {
      setTimeout(function () {
        let loader = document.getElementById('app')
        loader.classList.remove('loading')
      }, 1500)
    }
  }
</script>

<style lang="scss">
    #app {
        &:before {
            content: '';
            background-color: var(--primary);
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 9999;
            background-image: url('../static/apple-touch-icon.png');
            background-size: 100px;
            background-position: center center;
            background-repeat: no-repeat;
            opacity: 0;
            visibility: hidden;
            transition: visibility 0s linear 0.5s, opacity 0.5s linear;
        }
        &.loading {
            &:before {
                opacity: 1;
                visibility: visible;
            }
        }
    }

    main {
        padding-top: 56px;
        padding-bottom: 56px;
        position: relative;
        z-index: 0;

        #app.playing & {
            padding-bottom: 91px;
        }

        h1 {
            font-weight: 700;
            margin-bottom: 1rem;
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
    }

    .fa-icon {
        vertical-align: middle;
    }

    @media (min-width: 576px) {
        .container {
            padding-left: 0;
            padding-right: 0;
        }
    }
</style>
