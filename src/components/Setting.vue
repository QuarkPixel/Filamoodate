<!-- @format -->

<script setup></script>

<template>
	<div>
		<div>
			<section></section>
			<article></article>
			<aside>
				<svg
					width="190"
					height="60"
					viewBox="0 0 190 166"
					fill="none"
					xmlns="http://www.w3.org/2000/svg">
					<path
						d="M15 68C6.71573 68 0 74.7157 0 83C0 91.2843 6.71573 98 15 98V68ZM175 83L184.715 94.4291C188.068 91.5791 190 87.4005 190 83C190 78.5995 188.068 74.4209 184.715 71.5709L175 83ZM104.715 3.57091C98.4026 -1.79438 88.9362 -1.02684 83.5709 5.28527C78.2056 11.5974 78.9732 21.0638 85.2853 26.4291L104.715 3.57091ZM85.2853 139.571C78.9732 144.936 78.2056 154.403 83.5709 160.715C88.9362 167.027 98.4026 167.794 104.715 162.429L85.2853 139.571ZM15 98H175V68H15V98ZM85.2853 26.4291L165.285 94.4291L184.715 71.5709L104.715 3.57091L85.2853 26.4291ZM165.285 71.5709L85.2853 139.571L104.715 162.429L184.715 94.4291L165.285 71.5709Z"
						fill="var(--background-color)" />
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

		overflow: hidden;
		background-color: var(--background-color);
		border-radius: 32px;

		aside {
			height: calc(100% - 10px);
			width: 64px;

			position: absolute;
			top: 5px;
			right: 5px;
			display: flex;
			align-items: center;
			justify-content: center;

			background: #0004;
			border-radius: 29px;

			svg {
				width: 70%;
				// margin: 15%;
			}
		}
	}
}
</style>
