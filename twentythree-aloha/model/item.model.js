module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            img_name: String,
            file_name: String,
            fabric_type: Number
        },
        { timestamps: true }
    );

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Item = mongoose.model("items", schema);
    return Item;
};