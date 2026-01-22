@name-rules

1. 所有文件名称必须采用小写字母，单词之间用短横线分隔（kebab-case）。
2. 所有目录名称必须采用小写字母，单词之间用短横线分隔（kebab-case）。
3. 文件名称/目录名称必须直观，能够清晰地表达其功能或内容，避免简写或过于概况， 例如: 
    - 不应该使用 utils.ts 或 helpers.ts 等通用名称，应该根据功能进行命名，例如：get-ip-utility.ts
    - 不应该使用 config.ts 或 settings.ts 等通用名称，应该根据功能进行命名，例如：analysis-config.ts
4. 除了index.ts 文件外，其他文件避免使用一个单词作为文件名，应该根据功能进行命名，例如：get-ip-utility.ts
5. 工具函数 使用 xxx-utility 格式，例如：get-ip-utility.ts
6. 辅助函数 使用 xxx-helper 格式，例如：format-ip-helper.ts
7. 创建/构造/生成/处理/转换/解析/校验模块的文件名使用:
  - xxx-xxx-create.ts
  - xxx-xxx-constructor.ts
  - xxx-xxx-generator.ts
  - xxx-xxx-handler.ts
  - xxx-xxx-transformer.ts
  - xxx-xxx-parser.ts
  - xxx-xxx-validator.ts
