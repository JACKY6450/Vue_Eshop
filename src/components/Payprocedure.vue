<template>
    <div class="payprocedure row">
        <div class="col-md-4 ">
            <div class="text-center px-4 py-4 " 
                 :class = "step.step1 ? 'text-white bg-cyan': 'text-dark bg-lightcyan'" style="border-radius: 8px">
                <div class="h5">STEP1</div>
                <div class="h6 mt-3" >確認購物清單</div>
            </div>
        </div>
        <div class="col-md-4 ">
            <div class="text-center px-4 py-4 " 
                 :class = "step.step2 ? 'text-white bg-cyan': 'text-dark bg-lightcyan'" style="border-radius: 8px">
                <div class="h5">STEP2</div>
                <div class="h6 mt-3" >填寫購買人資訊</div>
            </div>
        </div>
        <div class="col-md-4 ">
            <div class="text-center px-4 py-4 " 
                 :class = "step.step3 ? 'text-white bg-cyan': 'text-dark bg-lightcyan'" style="border-radius: 8px">
                <div class="h5">STEP3</div>
                <div class="h6 mt-3" >確認訂單&付款</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        step: {
            type: Object,
            required: true
        } 
    },
    created(){
        console.log(this.step);
    }
}
</script>

<style>

</style>