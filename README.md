# 上线发布服务
自动化部署测试服务
发布地址为: http://pub.inovel.ml

## 初步想法
代码提交后，自动触发gitlab.com上的webhook，实现自动构建，并自动部署到测试环境
### 示例
以bfe/publisher为例
1. 入口设置：
    `https://gitlab.com/bfe/publisher > setting > integrations`
    Secret Token值为‘moviefe build’
    hook url初步拟订为 [http://pub.inovel.ml/api/push](http://pub.inovel.ml/api/push "PUSH URL") ,勾选push作为触发事件.

2. 当代码提交后，触发pushlisher项目中的Web api，会从git checkout指定分支，并检测目录下的的build命令
    每个项目需要一个bfe.json来指定项目信息，具体格式：
    ```javascript
    {
        port: '端口号',// 如果有的话,若无，则省略
        path: 'web目录',
        // .......
    }
    ```

3. 当build完成后，会执行npm run deploy ,开发者依据自己的需求，定制npm script

4. 项目发布完成后，会自动映射到 project.test.inovel.ml域名下
    如果机器配置够高，可以实现分支版本 xxx.project.test.inovel.ml映射部署

### publisher主要使用node开发，通过child process模块实现与OS的脚本交互
    数据存储暂定使用内存结合json文件

