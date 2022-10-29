<!-- @format -->

<script setup>
// import Displayer from "./components/Displayer.vue"
import Displayer from "./components/Displayer.vue"
import UserInterface from "./components/UserInterface.vue"
import Setting from "./components/Setting.vue"
import { ref, provide } from "vue"

provide("operating_area", ref([false, false]))
</script>

<template>
	<Displayer id="displayer"></Displayer>
	<UserInterface id="user-interface"></UserInterface>
	<Setting id="setting"></Setting>
</template>

<style scoped lang="less">
* {
	// background-color: aqua;
	// width: 100%;
	// height: 100%;
	position: absolute;
}
#displayer {
	// background-color: #010;

	width: 100%;
	height: 100%;
}
#user-interface {
	// background-color: #00f6;
}
#setting {
	// background-color: #f006;
	// bottom: 0;
	top: 0;
}
</style>
