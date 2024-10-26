/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
	theme: {
	  extend: {
		colors: {
		  black: "var(--black)",
		  "blue-shadeb05": "var(--blue-shadeb05)",
		  "blue-shadeb1": "var(--blue-shadeb1)",
		  "blue-shadeb2": "var(--blue-shadeb2)",
		  "blue-shadeb3": "var(--blue-shadeb3)",
		  "blue-shadeb4": "var(--blue-shadeb4)",
		  "blue-shadeb5": "var(--blue-shadeb5)",
		  "blue-shadeb6": "var(--blue-shadeb6)",
		  "blue-shadeb7": "var(--blue-shadeb7)",
		  "collection-1-active-citizen-r": "var(--collection-1-active-citizen-r)",
		  "collection-1-active-citizen-r-sl": "var(--collection-1-active-citizen-r-sl)",
		  "collection-1-active-citizen-r2": "var(--collection-1-active-citizen-r2)",
		  "collection-1-b-sl": "var(--collection-1-b-sl)",
		  "collection-1-black-shade-bl2": "var(--collection-1-black-shade-bl2)",
		  "collection-1-black-shade-bl4": "var(--collection-1-black-shade-bl4)",
		  "collection-1-black-shade-bl5": "var(--collection-1-black-shade-bl5)",
		  "collection-1-black-shade-bl6": "var(--collection-1-black-shade-bl6)",
		  "collection-1-black-sl": "var(--collection-1-black-sl)",
		  "collection-1-co-creator-or": "var(--collection-1-co-creator-or)",
		  "collection-1-co-creator-or1": "var(--collection-1-co-creator-or1)",
		  "collection-1-co-creator-orbg": "var(--collection-1-co-creator-orbg)",
		  "collection-1-color": "var(--collection-1-color)",
		  "collection-1-core-sk1": "var(--collection-1-core-sk1)",
		  "collection-1-core-sk2": "var(--collection-1-core-sk2)",
		  "collection-1-core-skybg": "var(--collection-1-core-skybg)",
		  "collection-1-electives-brown": "var(--collection-1-electives-brown)",
		  "collection-1-electives-brown-sl": "var(--collection-1-electives-brown-sl)",
		  "collection-1-electives-brown1": "var(--collection-1-electives-brown1)",
		  "collection-1-gr9": "var(--collection-1-gr9)",
		  "collection-1-r-sl2": "var(--collection-1-r-sl2)",
		  "collection-1-rbg": "var(--collection-1-rbg)",
		  "collection-1-white-shade-w10": "var(--collection-1-white-shade-w10)",
		  "collection-1-white-shade-w5": "var(--collection-1-white-shade-w5)",
		  "collection-1-white-shade-w6": "var(--collection-1-white-shade-w6)",
		  "collection-1-white-shade-w7": "var(--collection-1-white-shade-w7)",
		  "collection-1-white-shade-w8": "var(--collection-1-white-shade-w8)",
		  "collection-1-white-shade-w9": "var(--collection-1-white-shade-w9)",
		  "collection-1-ybg": "var(--collection-1-ybg)",
		  "collection-1-yellow-shade-y0-5": "var(--collection-1-yellow-shade-y0-5)",
		  "collection-1-yellow-shade-y1": "var(--collection-1-yellow-shade-y1)",
		  "collection-1-yellow-shade-y10": "var(--collection-1-yellow-shade-y10)",
		  "collection-1-yellow-shade-y2": "var(--collection-1-yellow-shade-y2)",
		  "collection-1-yellow-shade-y3": "var(--collection-1-yellow-shade-y3)",
		  "collection-1-yellow-shade-y5": "var(--collection-1-yellow-shade-y5)",
		  "collection-1-yellow-shade-y5-5": "var(--collection-1-yellow-shade-y5-5)",
		  "collection-1-yellow-shade-y6": "var(--collection-1-yellow-shade-y6)",
		  "collection-1-yellow-shade-y7": "var(--collection-1-yellow-shade-y7)",
		  "collection-1-yellow-shade-y8": "var(--collection-1-yellow-shade-y8)",
		  "collection-1-yellow-shade-ybg": "var(--collection-1-yellow-shade-ybg)",
		  "gray-shadegr05": "var(--gray-shadegr05)",
		  "gray-shadegr10": "var(--gray-shadegr10)",
		  "gray-shadegr3": "var(--gray-shadegr3)",
		  "gray-shadegr5": "var(--gray-shadegr5)",
		  "gray-shadegr6": "var(--gray-shadegr6)",
		  "gray-shadegr95": "var(--gray-shadegr95)",
		  white: "var(--white)",
		},
		fontFamily: {
		  h1: "var(--h1-font-family)",
		  h2: "var(--h2-font-family)",
		  h3: "var(--h3-font-family)",
		  h4: "var(--h4-font-family)",
		  h5: "var(--h5-font-family)",
		  h6: "var(--h6-font-family)",
		  h7: "var(--h7-font-family)",
		},
		boxShadow: {
		  "box-shadow": "var(--box-shadow)",
		  "sd-1": "var(--sd-1)",
		},
	  },
		variants: {
			extend: {
				backdropBlur: ['responsive'],
				backdropFilter: ['responsive'],
			},
		},
	},
	plugins: [
		require('@tailwindcss/forms'),
		require('@tailwindcss/typography'),
		require('@tailwindcss/aspect-ratio'),
	],
  };
  