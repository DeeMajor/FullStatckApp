using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Stationery.Domain.Database
{
    public class StoredProcedure
    {
        public readonly string SPItemCreate = "spItem_CreateItem";
        public readonly string SPItemDelete = "spItem_DeleteItem";
        public readonly string SPItemUpdate = "spItemUpdateItem";
        public readonly string SPItemGetAll = "spItem_GetAll";
        public readonly string SPItemGetById = "spItem_GetById";
        public readonly string SPStationeryGetItemsForList = "spItem_GetForThisList";
        public readonly string SPStationeryGetAll = "spStationery_GetAll";
        public readonly string SPStationeryGetById = "spStationery_GetByID";
        public readonly string SPStationeryCreate = "spStationeryList_Create";
        public readonly string SPStationeryDelete = "spStationery_Delete";
        public readonly string SPStationeryUpdate = "spStationeryList_Update";
    }
}
