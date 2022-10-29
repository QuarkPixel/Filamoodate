<!-- @format -->

<script setup>
import { ref, inject } from "vue"
const operating_area = inject("operating_area")
const abc = () => {
	console.log("abc")
}
</script>

<template>
	<!-- <div>{{ operating_area }}</div> -->
	<div class="operating">
		<div
			class="back"
			@mouseover=";(operating_area[0] = false), (operating_area[1] = false)"
		></div>
		<div
			class="left"
			@mouseover="operating_area[0] = true"
		></div>
		<div
			class="right"
			@mouseover="operating_area[1] = true"
		></div>
	</div>
</template>

<style lang="less">
.operating {
	width: 100%;
	height: 100%;

	position: absolute;
	top: 0;
	z-index: 1;

	> * {
		position: absolute;
		outline: 1px solid #fff3;
	}

	.back {
		width: 100%;
		height: 100%;

		// background-color: aqua;
	}

	.left {
		width: min(128pt, 50%);
		height: 100%;

		bottom: 0;
		left: 0;

		// background-color: #fff6;
	}

	.right {
		width: min(128pt, 50%);
		height: 100%;

		bottom: 0;
		right: 0;

		// background-color: #0006;
	}
}
</style>
