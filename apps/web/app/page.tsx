'use client'
import {
	BeforeAfter,
	Track,
	Thumb,
	BeforeImage,
	AfterImage,
	Content,
} from 'duality'

export default function Page(): JSX.Element {
	return (
		<main className="flex justify-center items-center h-svh">
			<BeforeAfter className="h-[480px] w-[640px] p-1 bg-gray-100 rounded-lg shadow-md">
				<Track className="h-full w-1 bg-white cursor-move">
					<Thumb className="w-6 h-6 bg-white rounded-full shadow-md" />
				</Track>

				<BeforeImage
					src="https://plus.unsplash.com/premium_photo-1699708592614-4b52c61e456f"
					alt=""
					className="object-cover rounded-md"
				>
					<Content className="top-4 left-4">
						<p>Before text</p>
						<p>🚀</p>
					</Content>
				</BeforeImage>
				<AfterImage
					src="https://images.unsplash.com/photo-1715464502545-090ee1dc122f"
					alt=""
					className="object-cover rounded-md"
				>
					<Content className="top-4 right-4 text-white">After text</Content>
				</AfterImage>
			</BeforeAfter>
		</main>
	)
}
