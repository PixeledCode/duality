'use client'

import * as React from 'react'

// ROOT
interface BeforeAfterProps extends React.HTMLAttributes<HTMLDivElement> {}

const BeforeAfter = React.forwardRef<HTMLDivElement, BeforeAfterProps>(
	(props: BeforeAfterProps, forwardedRef) => {
		const [sliderPos, setSliderPos] = React.useState(50)
		const ref = React.useRef<HTMLDivElement>(null)
		const finalRef = forwardedRef || ref

		const handleMouse = (e: MouseEvent) => {
			const rect = ref.current?.getBoundingClientRect()
			if (!rect) return

			const x = e.clientX - rect.left
			const pos = (x / rect.width) * 100

			if (pos < 0) {
				setSliderPos(0)
				return
			}

			if (pos > 100) {
				setSliderPos(100)
				return
			}

			setSliderPos(pos)
		}

		const handleMouseUp = () => {
			window.removeEventListener('mousemove', handleMouse)
			window.removeEventListener('mouseup', handleMouseUp)
		}

		const handleMouseDown = () => {
			window.addEventListener('mousemove', handleMouse)
			window.addEventListener('mouseup', handleMouseUp)
		}

		// React.useEffect(() => {
		// 	return () => {
		// 		window.removeEventListener('mousemove', handleMouse)
		// 		window.removeEventListener('mouseup', handleMouseUp)
		// 	}
		// }, [])

		return (
			<div
				style={
					{
						position: 'relative',
						'--slider-pos': `${sliderPos}%`,
						overflow: 'hidden',
					} as React.CSSProperties
				}
				ref={finalRef}
				onMouseDown={handleMouseDown}
				onClick={(e) => {
					e.stopPropagation()
					handleMouse(e as unknown as MouseEvent)
				}}
				{...props}
			/>
		)
	}
)

BeforeAfter.displayName = 'BeforeAfter'

// TRACK
interface TrackProps extends React.HTMLAttributes<HTMLDivElement> {}
const BeforeAfterTrack = React.forwardRef<HTMLDivElement, TrackProps>(
	(props: BeforeAfterProps, forwardedRef) => {
		// TODO: use innerDimensions to get the actual height
		return (
			<div
				style={{
					position: 'absolute',
					top: 0,
					left: 'var(--slider-pos)',
					zIndex: 3,
					paddingBlock: 'inherit',
				}}
				ref={forwardedRef}
				{...props}
			/>
		)
	}
)

BeforeAfterTrack.displayName = 'Track'

// THUMB
interface ThumbProps extends React.HTMLAttributes<HTMLDivElement> {}
const BeforeAfterThumb = React.forwardRef<HTMLDivElement, ThumbProps>(
	(props: BeforeAfterProps, forwardedRef) => {
		return (
			<div
				style={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
				}}
				ref={forwardedRef}
				{...props}
			/>
		)
	}
)

BeforeAfterThumb.displayName = 'Thumb'

const innerDimensions = (node: Element) => {
	const computedStyle = getComputedStyle(node)

	let width = node.getBoundingClientRect().width
	let height = node.getBoundingClientRect().height

	height -=
		parseFloat(computedStyle.paddingTop) +
		parseFloat(computedStyle.paddingBottom)
	width -=
		parseFloat(computedStyle.paddingLeft) +
		parseFloat(computedStyle.paddingRight)

	return { height, width }
}

// BeforeImage
interface BeforeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}
const BeforeImage = React.forwardRef<HTMLImageElement, BeforeImageProps>(
	(props: BeforeImageProps, forwardedRef) => {
		const ref = React.useRef<HTMLImageElement>(null)
		const finalRef = forwardedRef || ref
		const { children, ...others } = props

		React.useEffect(() => {
			if (ref.current) {
				// TODO: use context to get the parent element
				const parent = ref.current.parentElement?.parentElement
				if (!parent) return
				const { width, height } = innerDimensions(parent)
				ref.current.style.width = `${width}px`
				ref.current.style.height = `${height}px`
			}
		}, [])

		return (
			<div
				style={{
					position: 'absolute',
					overflow: 'hidden',
					zIndex: 2,
					width: 'var(--slider-pos)',
				}}
			>
				<img
					style={{
						userSelect: 'none',
						width: '100%',
						maxWidth: 'none',
					}}
					ref={finalRef}
					draggable={false}
					{...others}
				/>
				{children}
			</div>
		)
	}
)

BeforeImage.displayName = 'BeforeImage'

// AfterImage
interface AfterImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}
const AfterImage = React.forwardRef<HTMLImageElement, AfterImageProps>(
	(props: AfterImageProps, forwardedRef) => {
		const ref = React.useRef<HTMLImageElement>(null)
		const finalRef = forwardedRef || ref
		const { children, ...others } = props

		React.useEffect(() => {
			if (ref.current) {
				const parent = ref.current.parentElement?.parentElement
				if (!parent) return
				const { width, height } = innerDimensions(parent)
				ref.current.style.width = `${width}px`
				ref.current.style.height = `${height}px`
			}
		}, [])

		return (
			<div>
				<img
					style={{
						userSelect: 'none',
					}}
					draggable={false}
					ref={finalRef}
					{...others}
				/>
				{children}
			</div>
		)
	}
)

AfterImage.displayName = 'AfterImage'

// Content
interface ContentProps extends React.HTMLAttributes<HTMLDivElement> {}
const Content = React.forwardRef<HTMLDivElement, ContentProps>(
	(props: ContentProps, forwardedRef) => {
		return (
			<div
				style={{
					userSelect: 'none',
					position: 'absolute',
					textWrap: 'nowrap',
				}}
				ref={forwardedRef}
				{...props}
			/>
		)
	}
)

Content.displayName = 'Content'

const Root = BeforeAfter
const Track = BeforeAfterTrack
const Thumb = BeforeAfterThumb

export {
	BeforeAfter,
	BeforeAfterTrack,
	BeforeAfterThumb,
	//
	Root,
	Track,
	Thumb,
	BeforeImage,
	Content,
	AfterImage,
}

export type { BeforeAfterProps }
