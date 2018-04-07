<template>
    <div id="app">
        <navigation></navigation>
        <controls></controls>
        <main>
            <router-view/>
        </main>
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
    }
  }
</script>

<style lang="scss">
    main {
        padding-top: 56px;
        padding-bottom: 56px;

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
