//by Rene Mühlböck
export class JsonConverter{
    /**
     * Serializes the object to a json with a jsonType property
     * @date 2022-03-05
     * @param {Object} object The object which should be serialized.
     * @returns {{str:String, dictClassName: Object}} A object containing the json string and a dictionary for deserialize.
     */
    static serialize(object){
        let dictClassName = JsonConverter.addTypeProperty(object);
        return {str:JSON.stringify(object), dictClassName: dictClassName};
    }

    /**
     * Deserializes a given string to a object.
     * @date 2022-03-05
     * @param {String} strJson The json stiring to deserialize.
     * @param {Object} dictClassName A object contiaining a dictionary of jsonType as key and constructor
     * @returns {} Returns the casted object.
     */
    static deserialize(strJson, dictClassName){
        let object = JSON.parse(strJson);
        object = JsonConverter.castObject(object, dictClassName);
        JsonConverter.removeTypeProperty(object);
        return object;
    }

    /**
     * Adds the jsonType property to the given given object recursive.
     * @date 2022-03-05
     * @param {Object} obj Any object which type / class name should get the property (for deserialize)
     * @returns {Object} Returns a dictionary mapping the jsonType and the class
     */
    static addTypeProperty(obj,dictClassName = {})
    {
        obj.jsonType = obj.constructor.name;
        dictClassName[obj.constructor.name] = obj.constructor;

        for (var k in obj)
        {
            if (typeof obj[k] == "object" && obj[k] !== null)
                JsonConverter.addTypeProperty(obj[k], dictClassName);
        }

        return dictClassName;
    }

    /**
     * Removes the jsonType Property to the given given object recursive.
     * @date 2022-03-05
     * @param {Object} obj Any object which type / class name should get the property.
     * @returns {void} .
     */
    static removeTypeProperty(obj)
    {
        delete obj.jsonType;
 
        for (var k in obj)
        {
            if (typeof obj[k] == "object" && obj[k] !== null)
                JsonConverter.removeTypeProperty(obj[k]);
        }
 
        return obj;
    }

    /**
     * Casts the object to the given jsonType
     * @date 2022-03-05
     * @param {Object} obj Any object which type / class name should be casted
     * @param {Object} dictClassName A object contiaining a dictionary of jsonType as key and constructor
     * @param {Boolean} bRecCall Defines if the call was done rec.
     * @returns {void} .
     */
    static castObject(obj, dictClassName, bRecCall = false)
    {  
        if(obj.jsonType != null && bRecCall ==  false){
            obj = Object.assign(new dictClassName[obj.jsonType](), obj);
        }

        for (var k in obj)
        {
            if (typeof obj[k] == "object" && obj[k] !== null){
                if(obj[k].jsonType != null){
                    obj[k] = Object.assign(new dictClassName[obj[k].jsonType](), obj[k]);
                }
                JsonConverter.castObject(obj[k], dictClassName, true);
            }
        }
  
        return obj;
    }
}