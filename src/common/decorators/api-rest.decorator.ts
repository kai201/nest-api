import { Type, applyDecorators } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

import { R } from '../class/api-res.class';

const baseTypeNames = ['String', 'Number', 'Boolean'];

/**
 * 封装 swagger 返回统一结构
 * 支持复杂类型 {  code, msg, data }
 * @param model 返回的 data 的数据类型
 * @param isArray data 是否是数组
 * @param isPager 设置为 true, 则 data 类型为 { list, total } , false data 类型是纯数组
 */
export const ApiResResponse = <TModel extends Type<any>>(model?: TModel, isArray?: boolean) => {
  let items = null;
  if (model && baseTypeNames.includes(model.name)) {
    items = { type: model.name.toLocaleLowerCase() };
  } else {
    items = { $ref: getSchemaPath(model) };
  }
  let prop = null;
  if (isArray) {
    prop = {
      type: 'array',
      items,
    };
  } else if (model) {
    prop = items;
  }
  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(R) },
          {
            properties: {
              data: prop,
            },
          },
        ],
      },
    }),
  );
};

// @ApiOkResponse({
//     schema: {
//       allOf: [
//         { $ref: getSchemaPath(R) },
//         {
//           properties: {
//             success: { type: 'boolean', default: 'true' },
//             message: { type: 'string', default: 'success' },
//             data: {
//               allOf: [{ $ref: getSchemaPath(SysUser) }],
//             },
//           },
//         },
//       ],
//     },
//   })
