<template>
    <transition name="alertBox" mode="out-in">
        <div class="alertify">
            <div class="alertify-dialog">
                <div class="alertify-inner">
                    <p class="alertify-message">{{ message }}</p>
                        <nav class="alertify-buttons">
                            <button @click="closeAlert" class="alertify-button alertify-button-ok">{{btnText}}</button>
                        </nav>    
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    props: ['message', 'btnText'],
    methods: {
        closeAlert(){
            this.$emit('alertClose');
        }
    },
}
</script>
<style lang="css" scoped>
div{
    display: block;
}
p {
    display: block;
    /* margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    margin: 0 0 10px; */
}
    .alertify{
        background: #FFF;
        border: 10px solid #333;
        border: 2px solid rgba(0,0,0,.7);
        border-radius: 8px;
        box-shadow: 0 4px 4px rgba(0,0,0,.3);
        -webkit-background-clip: padding;
        -moz-background-clip: padding;
        background-clip: padding-box;
        position: fixed;
        z-index: 99999;
        top: 50px;
        left: 50%;
        width: 550px;
        margin-left: -275px;
        opacity: 1;
        /*animation: moveInTop .5s ease;*/
    }
    .alertBox-enter-active {
        animation: alertBox-in 400ms ease forwards;
        position: fixed;
        right:0px;
        z-index: 99;
    }
    .alertBox-leave-active {
        animation: alertBox-in 400ms ease reverse;
        position: fixed;
        right:0px;
        z-index: 99;
    }
    @keyframes alertBox-in {
        0% {
            opacity: 0;
            transform: translateY(-10rem);
        }

        80% {
            transform: translateY(1rem);
        }

        100% {
            opacity: 1;
            transform: translate(0);
        }
    }
    .alertify-text {
		border: 1px solid #CCC;
		padding: 10px;
		border-radius: 4px;
	}
    .alertify-dialog {
        padding: 25px;  
    }
    .alertify-inner {
        text-align: center;
    }
    .alertify-button {
		border-radius: 4px;
		color: #FFF;
		font-weight: bold;
		padding: 6px 15px;
		text-decoration: none;
		text-shadow: 1px 1px 0 rgba(0,0,0,.5);
		box-shadow: inset 0 1px 0 0 rgba(255,255,255,.5);
		background-image: -webkit-linear-gradient(top, rgba(255,255,255,.3), rgba(255,255,255,0));
		background-image:    -moz-linear-gradient(top, rgba(255,255,255,.3), rgba(255,255,255,0));
		background-image:     -ms-linear-gradient(top, rgba(255,255,255,.3), rgba(255,255,255,0));
		background-image:      -o-linear-gradient(top, rgba(255,255,255,.3), rgba(255,255,255,0));
		background-image:         linear-gradient(top, rgba(255,255,255,.3), rgba(255,255,255,0));
	}
    .alertify-button:hover,
	.alertify-button:focus {
		outline: none;
		background-image: -webkit-linear-gradient(top, rgba(0,0,0,.1), rgba(0,0,0,0));
		background-image:    -moz-linear-gradient(top, rgba(0,0,0,.1), rgba(0,0,0,0));
		background-image:     -ms-linear-gradient(top, rgba(0,0,0,.1), rgba(0,0,0,0));
		background-image:      -o-linear-gradient(top, rgba(0,0,0,.1), rgba(0,0,0,0));
		background-image:         linear-gradient(top, rgba(0,0,0,.1), rgba(0,0,0,0));
	}
	.alertify-button:focus {
		box-shadow: 0 0 15px #2B72D5;
	}
	.alertify-button:active {
		position: relative;
		box-shadow: inset 0 2px 4px rgba(0,0,0,.15), 0 1px 2px rgba(0,0,0,.05);
	}
		.alertify-button-cancel,
		.alertify-button-cancel:hover,
		.alertify-button-cancel:focus {
			background-color: #FE1A00;
			border: 1px solid #D83526;
		}
		.alertify-button-ok,
		.alertify-button-ok:hover,
		.alertify-button-ok:focus {
			background-color: #2578cf;
			border: 1px solid #2578cf;
		}

    .alertify-log {
        background: #1F1F1F;
        background: rgba(0,0,0,.9);
        padding: 15px;
        border-radius: 4px;
        color: #FFF;
        text-shadow: -1px -1px 0 rgba(0,0,0,.5);
    }
	.alertify-log-error {
		background: #FE1A00;
		background: rgba(254,26,0,.9);
	}
	.alertify-log-success {
		background: #5CB811;
		background: rgba(92,184,17,.9);
	}
</style>
