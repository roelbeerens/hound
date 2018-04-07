<template>
    <b-navbar fixed="top" toggleable="md" type="dark" variant="primary">
        <b-navbar-brand href="/#/">Hound</b-navbar-brand>
        <b-navbar-toggle target="nav_collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar top-bar"></span>
            <span class="icon-bar middle-bar"></span>
            <span class="icon-bar bottom-bar"></span>
        </b-navbar-toggle>
        <b-collapse is-nav id="nav_collapse">
            <b-navbar-nav>
                <b-nav-item href="/#/">Home</b-nav-item>
                <b-nav-item href="/#/radio">Radio</b-nav-item>
                <b-nav-item href="/#/settings">Settings</b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<style lang="scss" scoped>
    .navbar-toggler {
        padding: .75rem 0rem;
        border: none;
        outline: 0;

        .icon-bar {
            background-color: white;
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
</style>
