import * as mongoose from "mongoose";
import * as types from '../types/model';

export type CommunityModel = mongoose.Document & types.Community;

const communitySchema = new mongoose.Schema({
  name: String
}, { timestamps: true });

const Community = mongoose.model("Community", communitySchema);
export default Community;
