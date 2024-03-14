<template>
  <div>
    <el-input v-model="findContent" placeholder="请输入标题关键字" style="width: 222px; margin-right: 12px; margin-bottom: 12px"></el-input>
    <el-select v-model="selectedValue" placeholder="请选择文件夹" style="margin-right: 10px" @change="searchPic">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>

    <el-button type="primary" icon="el-icon-search" @click="searchPic">搜索</el-button>
    <el-button type="danger" @click="delOssPic">批量删除</el-button>
    <div>
      <div style="display: flex">
        <!-- action是请求的地址,需要token所以加入请求头,自动上传关闭
        data直接携带参数，nb
      multiple批量选择文件 -->
        <el-upload
          class="upload-btn"
          :action="actionUrl"
          :headers="uploadHeaders"
          :auto-upload="false"
          ref="upload"
          :data="{ path: this.selectedValue }"
          :show-file-list="showFileList"
          :before-upload="handleBeforeUpload"
          :on-success="handleSuccess"
          multiple
          style="height: 20px; width: 90px; padding-bottom: 10px"
        >
          <el-button size="small" type="primary">选取本地文件</el-button>
        </el-upload>
        <el-button type="success" style="margin-left: 20px; margin-bottom: 30px; margin-left: 30px" @click="handleUpload" size="small">
          上传
        </el-button>
      </div>
    </div>
    <el-table
      :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
      style="width: 100%; border: 2px solid #ebeef5; border-color: #868686"
      :header-cell-style="tableHeaderCellStyle"
      border
      :cell-style="tableCellStyle"
      @selection-change="handleSelectionChange"
    >
      <el-table-column header-align="center" align="center" type="selection" width="55"></el-table-column>
      <el-table-column header-align="center" align="center" prop="id" label="id" width="100"></el-table-column>
      <el-table-column header-align="center" align="center" prop="picName" label="名称" width="100"></el-table-column>
      <el-table-column header-align="center" align="center" prop="url" label="图片">
        <template slot-scope="scope">
          <img :src="scope.row.url" style="width: 100px" />
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" prop="url" label="URL" width="100"></el-table-column>
      <el-table-column header-align="center" align="center" prop="fileSize" label="大小" width="100"></el-table-column>
      <el-table-column header-align="center" align="center" prop="createBy" label="创建人" width="100"></el-table-column>
      <el-table-column header-align="center" align="center" prop="createDate" label="创建时间" width="100"></el-table-column>
      <el-table-column label="操作" header-align="center" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="modify(scope.row)">修改</el-button>

          <el-button size="mini" type="danger" @click="delOssPic(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <div class="block" style="margin-top: 15px">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.length"
        ></el-pagination>
      </div>
    </div>
    <!-- 弹框组件 -->
    <el-dialog :visible.sync="dialogVisible" title="修改名称">
      <el-form label-width="80px">
        <el-form-item label="新名称">
          <el-input v-model="picName"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="confirmDialog">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getFolderList } from '@/api/bed/folder/index';
export default {
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: '',
      selectedValue: '', // 初始化为空
      options: [],
      showFileList: false, //隐藏上传的文件列表
      dataListSelections: [], //用来存放多选的对象
      findContent: '', //搜索框内容
      uploadHeaders: {
        picToken: this.$cookie.get('token') // 添加自定义请求头
      },
      actionUrl: '/api/luckyNwa/uploadPic',

      dialogVisible: false, // 控制弹框显示与隐藏
      picName: '', // 输入框1的值
      tempId: 0 //用来存id修改时候用到
    };
  },
  methods: {
    handleBeforeUpload(file) {
      // 处理上传前的逻辑
      // console.log(file.type)
      // const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      // const isLt2M = file.size / 1024 / 1024 < 2
      // console.log(isLt2M, isJPG)
      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG或PNG 格式!')
      // }
      // if (!isLt2M) {
      //   this.$message.error('上传头像图片大小不能超过 2MB!')
      // }
      // return isJPG && isLt2M
    },
    handleSuccess(response, file, fileList) {
      // 处理上传成功的逻辑

      if (response.code === 0) {
        this.getYunList();
      } else {
        this.failMsg(response.msg);
      }
    },

    //手动上传
    handleUpload() {
      this.$nextTick(() => {
        //确保在DOM更新后再执行提交操作
        this.$refs.upload.submit(); // 提交表单
      });
    },

    modify(obj) {
      this.dialogVisible = true; // 打开弹框
      this.picName = obj.picName;
      this.tempId = obj.id;
      console.log(obj);
      // this.$message.error('功能正在开发中....')
    },
    confirmDialog() {
      // 处理弹框确认逻辑
      modifyInfo({
        id: this.tempId,
        picName: this.picName,
        folder: this.selectedValue
      }).then(res => {
        this.successMsg(res.msg);
        this.getYunList();
      });

      this.closeDialog(); // 关闭弹框
    },
    closeDialog() {
      this.dialogVisible = false; // 关闭弹框
      this.tempId = 0;
      this.picName = '';
    },
    //获取图片列表
    getYunList() {
      this.$http({
        url: this.$http.adornUrl('/bedPic/list'),
        method: 'post',
        data: this.$http.adornData({
          picName: this.findContent || 'pic',
          folder: this.selectedValue,
          page: 1,
          limit: 100
        })
      }).then(({ data }) => {
        if (data && data.code === 0) {
          console.log('🚀 ~ getYunList ~ data:', data);
          this.$data.tableData = data.list;
        } else {
          this.$message.error(data.msg);
        }
      });
    },
    //删除图片
    delOssPic(obj) {
      if (this.dataListSelections.length === 0) {
        if (obj instanceof PointerEvent) {
          this.failMsg('请先选择要删除的框！');
          return;
        }
      }
      var ids = obj.id //处理完[]这种包着的
        ? [obj.id]
        : this.dataListSelections.map(item => {
            return item.id;
          });

      this.$confirm(`确定对[id=${ids.join(',')}]进行[${obj.id ? '删除' : '批量删除'}]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          //不管单还是多都是传一个数组就行
          delRemotePic(ids, this.selectedValue).then(res => {
            this.successMsg(res.msg);
            this.getYunList();
          });
        })
        .catch(() => {});
    },

    //复选框
    handleSelectionChange(val) {
      this.dataListSelections = val;
    },
    //查找图片
    searchPic() {
      this.getYunList();
    },
    // 每页条数改变时触发，选中一页显示多少行
    handleSizeChange(val) {
      console.log(`每页${val}条`);
      this.currentPage = 1;
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页:${val}`);
      this.currentPage = val;
    },
    //表格样式
    tableCellStyle() {
      return 'border-color: #868686;';
    },

    tableHeaderCellStyle() {
      return 'border-color: #868686; color: #606266;';
    }
  },

  created() {
    this.getYunList();

    //获取文件夹列表,处理成下拉框数据
    getFolderList({
      folderName: '',
      userId: 1
    }).then(({ data }) => {
      if (data && data.code === 0) {
        console.log('🚀 ~ getYunList ~ data:', data);
        this.options = data.data.map(folder => ({
          value: folder.folderName,
          label: folder.folderName
        }));
      } else {
        this.$message.error(data.msg);
      }
    });
  }
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed red;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: blue;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
