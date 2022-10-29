<!-- @format -->

<script setup>
import { ref, inject } from "vue"
const operating_area = inject("operating_area")

const isSettingUi = ref(false)
</script>

<template>
	<div>
		<div :class="{ prompt: operating_area[0], display: isSettingUi }">
			<p>Settings</p>
			<div>
				<section>
					<input type="radio" />
				</section>
				<article></article>
			</div>
			<aside
				v-on:click="isSettingUi = !isSettingUi"
				attr="Settings"
			>
				<svg
					width="48"
					height="48"
				>
					<path
						v-if="isSettingUi"
						d="M14 14L34 34M14 34L34 14"
						stroke="var(--background-color)"
						stroke-width="6"
						stroke-linecap="round"
					/>
					<path
						v-else
						d="M6 24L39 24M23 9L40 24M40 24L23 39"
						stroke="var(--background-color)"
						stroke-width="6"
						stroke-linecap="round"
					/>
				</svg>
			</aside>
		</div>
	</div>
</template>

<style lang="less">
#setting {
	width: 100%;
	height: 100%;

	display: flex;
	align-items: center;
	justify-content: center;

	> div {
		width: min(800px, 80%);
		height: 80%;

		position: relative;
		left: max(calc(-400px - 51%), -91%);
		// left: max(calc(-326px - 50%), calc(74px - 90%));
		z-index: 2;

		overflow: hidden;
		background-color: var(--background-color-alpha);
		border-radius: 32px;

		transition: 0.5s var(--curve);

		> p {
			height: 48px;
			margin: 10px 68px;

			display: block;

			text-align: center;
			line-height: 48px;
			font-size: 40px;
			font-weight: bold;
		}

		> div {
			height: calc(100% - 78px);
			// width: calc();
			margin: 0 74px 0 10px;

			display: flex;
			flex-direction: row;

			transition: 0.5s var(--curve);

			section {
				width: 200px;
				height: 100%;
				margin-right: 7px;

				background-color: var(--color-alpha);
				border-radius: 10px 5px 5px 22px;
			}

			article {
				height: 100%;

				flex: 1;

				background-color: var(--color-alpha);
				border-radius: 5px 10px 22px 5px;
			}
		}

		aside {
			height: calc(100% - 10px);
			width: 64px;

			position: absolute;
			top: 5px;
			right: 5px;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			background: var(--color);
			opacity: 0.1;
			border-radius: 10px 29px 29px 10px;

			transition: 0.5s var(--curve);

			cursor: pointer;

			&:hover {
				opacity: 0.4;
			}
		}
	}

	> .prompt {
		left: max(calc(-326px - 50%), calc(74px - 90%));
	}

	> .display {
		left: 0;

		> div {
			margin: 0 10px;
		}

		aside {
			opacity: 0.3;
			width: 48px;
			height: 48px;

			margin: 5px;
			border-radius: 24px;
		}
	}
}
</style>
