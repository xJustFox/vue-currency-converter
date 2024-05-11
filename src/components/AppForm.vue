<script>
export default {
    name: 'AppForm';
    props: {
        values: Array,
    },

}
</script>

<template>
    <div class="d-flex py-1">
        <input class="col-6 my-input text-center p-2 " type="text" name="" id="">
        <select class="col-6 my-select text-center p-2 " name="" id="">
            <option value="">1</option>
        </select>
    </div>
</template>

<style lang="scss">
@use '../style/partials/variables' as *;
.my-input,
.my-select{
    background-color: $my_lightGray;
    border: 0;

    &:focus-visible{
        outline: 2px solid $my_green;
        z-index: 1;
        border: 0;

    }
}

.my-select{
    border-left: 1px solid gray;
    border-radius: 0 10px 10px 0;
}

.my-input{
    border-right: 1px solid gray;
    border-radius: 10px 0 0 10px;
}
</style>