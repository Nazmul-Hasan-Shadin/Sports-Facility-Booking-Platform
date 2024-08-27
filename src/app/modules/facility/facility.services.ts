import { TFacility } from "./facility.interface";
import { Facility } from "./facility.models";


const getSingleFacilityIntoDB = async (id: string) => {
  const result = await Facility.findById(
    { _id: id },)
   
  return result;
};

const createFacilityIntoDb = async (payload: TFacility) => {
  const result = await Facility.create(payload);
  return result;
};

const updateFacilityIntoDB = async (id: string, payload: TFacility) => {
  const result = await Facility.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteFacilityIntoDB = async (id: string) => {
  const result = await Facility.findOneAndUpdate(
    { _id: id },
    {
      isDeleted: true,
    },
    { new: true }
  );
  return result;
};

const getAllFacilityFromDB = async (query: Record<string, unknown>) => {
  // {email:{$regx:searchtekeyword ,$options:'i'}}
  const excludes = ['searchTerm', 'sort','limit','page','fields']
  let searchTerms: any = "";



  const queryObj = { ...query }
  excludes.forEach((el) => delete queryObj[el])

  if (query.searchTerm) {
    searchTerms = query.searchTerm;
  }
  console.log(query, searchTerms);

  const searchQuery = Facility.find({
    $or: ["name", "description", "location"].map((field) => ({
      [field]: { $regex: searchTerms, $options: "i" },
    })),
  });
     
 
  const filterQuery=searchQuery.find(queryObj)

  let sort= 'createdAt'
  if (query.sort) {
     sort= query.sort as string
  }

  const sortQuery= filterQuery.sort(sort)

  let limit = 5;
  let page = 1;
  let skip=0
  if (query.limit) {
    limit= Number(query?.limit) 
  }

  const paginateQuery= sortQuery.limit(limit)
  
  if (query.page) {
    page=Number(query.page) 
    skip=(page-1)*limit as number
  }

  const skipQuery= await paginateQuery.skip(skip)

  return skipQuery;
};

export const FacilityServices = {
  createFacilityIntoDb,
  updateFacilityIntoDB,
  deleteFacilityIntoDB,
  getAllFacilityFromDB,
  getSingleFacilityIntoDB
};
