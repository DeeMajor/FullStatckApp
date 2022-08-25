namespace Stationery.Api.Repository.Database
{
    public static class StoredProcedure
    {
        public const string SPItemCreate = "spItem_CreateItem";
        public const string SPItemDelete = "spItem_DeleteItem";
        public const string SPItemUpdate = "spItemUpdateItem";
        public const string SPItemGetAll = "spItem_GetAll";
        public const string SPItemGetById = "spItem_GetById";
        public const string SPStationeryGetItemsForList = "spItem_GetForThisList";
        public const string SPStationeryGetAll = "spStationery_GetAll";
        public const string SPStationeryGetById = "spStationery_GetByID";
        public const string SPStationeryCreate = "spStationeryList_Create";
        public const string SPStationeryDelete = "spStationery_Delete";
        public const string SPStationeryUpdate = "spStationeryList_Update";
    }
}
