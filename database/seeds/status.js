const Status = require("../../models/Status")


const data = [
	{
		key: "private",
		title: "خصوصی",
	},
	{
		key: "public",
		title: "عمومی",
	},
]

exports.status = () => {

	Status.find({ "key": ["private", "public"] }).then(result => {

		if (result.length === 0)

			data.forEach(element => {
				Status.create(element)
			});

	}).catch(err => {

		console.log(err)
	})

}