<!-- @format -->

<script setup>
import { ref } from "vue"
const operating_area = ref([false, false])
</script>

<template>
	<div>{{ operating_area }}</div>
	<div class="operating">
		<div
			class="left"
			@mouseover="operating_area[0] = true"
			@mouseleave="operating_area[0] = false">
			<br />Left<br />
		</div>
		<div
			class="right"
			@mouseover="operating_area[1] = true"
			@mouseleave="operating_area[1] = false">
			>Right
		</div>
	</div>
</template>

<style lang="less">
.operating {
	width: 100%;
	height: 100%;

	position: absolute;
	top: 0;

	background: #0006;

	> * {
		position: absolute;
		outline: 1px solid #000;
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
