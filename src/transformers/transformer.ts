import * as xml2js from 'xml2js';
import { AcceptsCredentials } from '../services/credentials';

export class Transformer extends AcceptsCredentials {
  protected parseXml(xml: string): Promise<any> {
    return new Promise((resolve, reject) => {
      xml2js.parseString(xml, (err, result) => {
        if (err) {
          reject(err);
        }

        resolve(result);
      });
    });
  }

  protected removeEmpties(object) {
    Object.keys(object).forEach((key, index) => {
      if (object[key] instanceof Object) {
        return this.removeEmpties(object[key]);
      }

      if (!object[key] && object[key] !== 0 && object[key] !== false) {
        delete object[key];
      }
    });

    return object;
  }
}

export interface XmlToObjectTransformer {
  xmlItems(xml: string): Promise<any[]>;

  xmlItem(xml: string): Promise<any>;
}

export interface ObjectToXmlTransformer {
  item(object: any, index?: number);

  items(object: any[]);
}
