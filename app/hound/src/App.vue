<template>
    <div id="app">
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
    }
  }
</script>

<style lang="scss">
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        font-weight: 800;
        margin-bottom: 1rem;
    }
    main {
        padding-top: 56px;
        padding-bottom: 56px;
        .playing & {
            padding-bottom: 91px;
        }
    }
    .hmt {
        margin-top: 1rem;
    }
    .hmb {
        margin-bottom: 1rem;
    }
    @media (min-width: 576px) {
        .container {
            padding-left: 0;
            padding-right: 0;
        }
    }
</style>
