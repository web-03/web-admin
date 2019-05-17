const product = function(id, name,price,quantity, description, image, categoryId, status){
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.description = description;
    this.image = image;
    this.categoryId = categoryId;
    this.status = status;
}
module.exports = product;