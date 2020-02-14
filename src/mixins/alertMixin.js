import msgAlert from '@/components/messageAlert.vue'

export default {
    data() {
        return {
            alert: false
        }
    },
    components: {
        'msg-alert': msgAlert
    },
    methods: {
        triggerAlert(){
            this.alert = !this.alert;
        }
    },
}