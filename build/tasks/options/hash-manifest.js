module.exports = {
	googleCDN: {
		options: {
			algo: "md5",
			cwd: "<%= dirs.tmp %>"
		},
		src: [ "**/*" ],
		dest: "MANIFEST"
	}
};
